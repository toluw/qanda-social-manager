#!/usr/bin/env python3
"""Check local Temporal health and history without printing workflow values."""
import json
from pathlib import Path
import subprocess
import sys

BASE = ['docker', '--context', 'desktop-linux', 'compose', '-f',
        str(Path(__file__).with_name('compose.restore.yaml')), 'exec', '-T',
        'temporal', 'temporal', '--address', 'temporal:7233', '--namespace',
        'default', '--command-timeout', '20s']

def command(arguments, structured=True):
    result = subprocess.run(BASE + (['--output', 'json'] if structured else []) + arguments,
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError('Local recovery request failed')
    return json.loads(result.stdout) if structured else result.stdout.decode().strip()

def main():
    if command(['operator', 'cluster', 'health'], False) != 'SERVING':
        raise RuntimeError('Local Temporal is not serving')
    rows = command(['workflow', 'list', '--limit', '10'])
    row = next((row for row in rows if not row.get('type', {}).get('name', '').startswith('temporal-sys')), None)
    if not row:
        raise RuntimeError('No restored application workflow available')
    execution = row['execution']
    history = command(['workflow', 'show', '--workflow-id', execution['workflowId'],
                       '--run-id', execution['runId']])
    events = history.get('events', []) if isinstance(history, dict) else history
    if not events:
        raise RuntimeError('Restored workflow returned no history')
    print(f'Temporal recovery passed: SERVING; restored application history has {len(events)} events')

if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('Local Temporal recovery check failed; workflow values withheld.', file=sys.stderr)
        sys.exit(1)
