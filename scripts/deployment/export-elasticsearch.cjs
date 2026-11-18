// Run via stdin in the existing app container; stdout is private backup data.
// Read-only scroll export. It does not configure repositories or change indexes.
const index = process.argv[2];
if (!index || !/^temporal[a-z0-9_-]*$/.test(index)) throw new Error('Explicit Temporal index required');
const base = 'http://temporal-elasticsearch:9200';
async function request(path, body, method = body ? 'POST' : 'GET') {
  const response = await fetch(base + path, {
    method, headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Elasticsearch request failed: HTTP ${response.status}`);
  return response.json();
}
async function emit(value) {
  await new Promise((resolve, reject) => process.stdout.write(JSON.stringify(value) + '\n', error => error ? reject(error) : resolve()));
}
(async () => {
  const definition = (await request('/' + index))[index];
  await emit({ type: 'definition', format: 1, index, definition });
  let page = await request('/' + index + '/_search?scroll=2m', {
    size: 250, sort: ['_doc'], query: { match_all: {} }, track_total_hits: true,
  });
  const expected = page.hits.total.value;
  let count = 0, scrollId;
  try {
    for (;;) {
      scrollId = page._scroll_id;
      if (!page.hits.hits.length) break;
      for (const hit of page.hits.hits) { await emit({ type: 'document', hit }); count++; }
      page = await request('/_search/scroll', { scroll: '2m', scroll_id: scrollId });
    }
    if (count !== expected) throw new Error('Export count mismatch');
    await emit({ type: 'complete', count });
  } finally {
    if (scrollId) await request('/_search/scroll', { scroll_id: [scrollId] }, 'DELETE');
  }
})().catch(() => { console.error('Elasticsearch export failed; capture must remain incomplete.'); process.exitCode = 1; });
