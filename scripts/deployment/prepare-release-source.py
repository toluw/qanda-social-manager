#!/usr/bin/env python3
"""Generate the image's source offer from its already-published build revision."""
import json
from pathlib import Path
import re
import subprocess
import sys

revision = sys.argv[1]
if not re.fullmatch(r'[0-9a-f]{40}', revision):
    raise SystemExit('A full published Git commit is required')
root = Path(__file__).resolve().parents[2]
config_path = root / 'apps/frontend/source-code-config.json'
config = json.loads(config_path.read_text())
if config.get('repositoryUrl') != 'https://github.com/toluw/qanda-social-manager':
    raise SystemExit('Unexpected source repository')
if config.get('urlApproved') is not True or config.get('sourcePublished') is not True:
    raise SystemExit('Source approval/publication flags are incomplete')
config['releaseCommit'] = revision
config_path.write_text(json.dumps(config, indent=2) + '\n')
subprocess.run([sys.executable, str(root / 'apps/frontend/scripts/prepare-source-page.py')], check=True)
