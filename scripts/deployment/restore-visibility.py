#!/usr/bin/env python3
"""Read a decrypted visibility export on stdin; restore only to local Docker.

Does not log document contents or identifiers. Does not access production.
"""
import json
from pathlib import Path
import re
import subprocess
import sys

COMPOSE = Path(__file__).with_name('compose.restore.yaml')

def request(path, method='GET', body=None):
    command = ['docker', '--context', 'desktop-linux', 'compose', '-f', str(COMPOSE),
               'exec', '-T', 'elasticsearch', 'curl', '-fsS', '-X', method,
               '-H', 'Content-Type: application/json', 'http://localhost:9200' + path]
    if body is not None:
        command += ['--data-binary', '@-']
    result = subprocess.run(command, input=body, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError('Local Elasticsearch request failed')
    return json.loads(result.stdout) if result.stdout else {}

def main():
    records = [json.loads(line) for line in sys.stdin if line.strip()]
    header, trailer = records[0], records[-1]
    index = header['index']
    assert re.fullmatch(r'temporal[a-z0-9_-]*', index)
    assert header['type'] == 'definition' and header['format'] == 1
    assert trailer['type'] == 'complete'
    documents = records[1:-1]
    assert len(documents) == trailer['count']
    assert all(record['type'] == 'document' for record in documents)
    # PUT without a delete intentionally refuses to overwrite an existing index.
    definition = header['definition']
    settings = dict(definition['settings']['index'])
    for field in ['uuid', 'version', 'creation_date', 'provided_name', 'history_uuid',
                  'resize', 'verified_before_close']:
        settings.pop(field, None)
    request('/' + index, 'PUT', json.dumps({
        'settings': {'index': settings}, 'mappings': definition['mappings'],
        'aliases': definition.get('aliases', {}),
    }).encode())
    bulk = []
    for record in documents:
        hit = record['hit']
        metadata = {'_index': index, '_id': hit['_id']}
        if '_routing' in hit:
            metadata['routing'] = hit['_routing']
        bulk += [json.dumps({'create': metadata}), json.dumps(hit['_source'])]
    if bulk:
        response = request('/_bulk?refresh=true', 'POST', ('\n'.join(bulk) + '\n').encode())
        assert response.get('errors') is False
    count = request('/' + index + '/_count')['count']
    assert count == trailer['count']
    print(f'Local Temporal visibility restore passed: {count} documents')

if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('Visibility restore failed; inspect local state privately. No documents logged.', file=sys.stderr)
        sys.exit(1)
