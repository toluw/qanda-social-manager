// Feed to `docker run --rm -i --network none --entrypoint node IMAGE - REVISION`.
// No application services, production data or provider credentials are loaded.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const revision = process.argv[2];
assert.match(revision, /^[0-9a-f]{40}$/);
assert.equal(process.env.NODE_ENV, undefined);
assert.equal(fs.existsSync('/app/.env'), false);
assert.equal(require('/app/node_modules/next/package.json').version, '16.4.6');
assert.equal(require('/app/package.json').dependencies.polotno, undefined);
assert.equal(fs.existsSync('/app/node_modules/polotno'), false);
const config = JSON.parse(fs.readFileSync('/app/apps/frontend/source-code-config.json', 'utf8'));
assert.equal(config.releaseCommit, revision);
assert.equal(config.repositoryUrl, 'https://github.com/toluw/qanda-social-manager');
assert.ok(fs.readFileSync('/app/apps/frontend/public/legal.html', 'utf8').includes('/archive/' + revision + '.tar.gz'));
assert.equal(fs.readFileSync('/app/LICENSE', 'utf8'), fs.readFileSync('/app/apps/frontend/public/license.txt', 'utf8'));
assert.equal(fs.readFileSync('/app/apps/frontend/src/fonts/plus-jakarta-sans/OFL.txt', 'utf8'), fs.readFileSync('/app/apps/frontend/public/font-license.txt', 'utf8'));
assert.equal(fs.readFileSync('/app/THIRD_PARTY_NOTICES.md', 'utf8'), fs.readFileSync('/app/apps/frontend/public/third-party-notices.txt', 'utf8'));
const schema = fs.readFileSync('/app/libraries/nestjs-libraries/src/database/prisma/schema.prisma');
assert.equal(crypto.createHash('sha256').update(schema).digest('hex'), 'fc4f5ca720425c3b071a1f46030713d9af8729b4472aba9f77d1684b40df772d');
const bcrypt = require('/app/node_modules/bcrypt');
assert.ok(bcrypt.compareSync('image-probe', bcrypt.hashSync('image-probe', 4)));
const purify = require('/app/node_modules/isomorphic-dompurify');
assert.ok(!purify.sanitize('<img src=x onerror=alert(1)>').includes('onerror'));
require('/app/node_modules/@temporalio/worker');
console.log('Image checks passed: runtime defaults, Next.js, native modules, notices, source offer, schema, Polotno absence');
