// Local staging only. All non-local browser requests are blocked; production
// API URLs embedded in the release bundle are forwarded to the local API.
const { chromium } = require('playwright');
const crypto = require('node:crypto');
const origin = 'http://127.0.0.1:4008';
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });
  try {
    const context = await browser.newContext({ serviceWorkers: 'block', ignoreHTTPSErrors: true });
    let blocked = 0;
    let routeFailures = 0;
    await context.route('**/*', async route => {
      try {
      const request = route.request(), url = new URL(request.url());
      if (url.origin === origin) return await route.continue();
      if (url.origin === 'https://postiz.qanda.ng' && url.pathname.startsWith('/api/')) {
        if (request.method() === 'OPTIONS') {
          // Forward the real backend preflight; its response has no stream.
          const response = await route.fetch({ url: 'https://127.0.0.1:4443' + url.pathname + url.search });
          return await route.fulfill({ response });
        }
        // Continue through local TLS to retain streaming and the URL protocol.
        return await route.continue({ url: 'https://127.0.0.1:4443' + url.pathname + url.search });
      }
      blocked++;
      return await route.abort('blockedbyclient');
      } catch {
        // Playwright errors can include Cookie/Auth headers. Never print them.
        routeFailures++;
        await route.abort('failed').catch(() => {});
      }
    });
    const page = await context.newPage();
    let pageErrors = 0;
    page.on('pageerror', () => pageErrors++);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/auth/login', '/auth', '/legal.html']) {
        const response = await page.goto(origin + path, { waitUntil: 'load', timeout: 90000 });
        const result = await page.evaluate(() => ({
          brand: document.body.innerText.includes('Q and A Social Manager'),
          overflow: document.documentElement.scrollWidth > innerWidth,
          brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).length,
        }));
        if (response.status() !== 200 || !result.brand || result.overflow || result.brokenImages)
          throw new Error('Signed-out page validation failed');
        console.log(JSON.stringify({ width, path, status: response.status(), ...result }));
      }
    }
    // A disposable local account verifies real registration and authenticated UI.
    // No production passwords, OAuth keys or tokens are used or printed.
    const email = `local-smoke-${Date.now()}@example.test`;
    const password = crypto.randomBytes(24).toString('hex');
    await page.goto(origin + '/auth', { waitUntil: 'load' });
    await page.locator('input[name=email]').fill(email);
    await page.locator('input[name=password]').fill(password);
    await page.locator('input[name=company]').fill('Local Staging Smoke');
    await page.locator('form button[type=submit]').click();
    await page.waitForURL(url => !url.pathname.startsWith('/auth'), { timeout: 90000 });
    await context.clearCookies();
    await page.goto(origin + '/auth/login', { waitUntil: 'load' });
    await page.locator('input[name=email]').fill(email);
    await page.locator('input[name=password]').fill(password);
    await page.locator('form button[type=submit]').click();
    await page.waitForURL(url => !url.pathname.startsWith('/auth'), { timeout: 90000 });
    console.log('Disposable local account registration and sign-in passed');
    for (const path of ['/launches', '/media', '/settings']) {
      const response = await page.goto(origin + path, { waitUntil: 'load', timeout: 90000 });
      if (response.status() !== 200 || new URL(page.url()).pathname.startsWith('/auth'))
        throw new Error('Authenticated page validation failed');
      console.log(JSON.stringify({ path, status: response.status(), authenticated: true }));
    }
    if (pageErrors || routeFailures) throw new Error('Browser or route errors detected');
    console.log(JSON.stringify({ browserErrors: pageErrors, routeFailures, externalRequestsBlocked: blocked }));
  } finally { await browser.close(); }
})().catch(() => { console.error('Local staging smoke failed; credentials and page contents withheld.'); process.exitCode = 1; });
