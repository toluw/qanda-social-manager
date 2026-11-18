#!/usr/bin/env python3
"""Compare archive/file bytes in memory; never log names or write plaintext."""
import hashlib
from pathlib import Path
import subprocess
import sys
import tarfile

def main():
    backup_directory, identity = sys.argv[1:]
    decrypt = subprocess.Popen(['age', '-d', '-i', identity,
                                str(Path(backup_directory) / 'uploads-config.tar.age')],
                               stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    expected = {}
    with tarfile.open(fileobj=decrypt.stdout, mode='r|') as archive:
        for member in archive:
            if not member.isfile():
                continue
            digest = hashlib.sha256()
            with archive.extractfile(member) as stream:
                while chunk := stream.read(1024 * 1024):
                    digest.update(chunk)
            expected[member.name.removeprefix('./')] = digest.hexdigest()
    if decrypt.wait() != 0:
        raise RuntimeError('Decryption failed')
    check = subprocess.run(['docker', '--context', 'desktop-linux', 'run', '--rm',
                            '--network', 'none', '-v', 'qanda-restore-check_media:/restore:ro',
                            '--entrypoint', 'sh', 'postgres:17-alpine', '-c',
                            'cd /restore && find . -type f -exec sha256sum {} +'],
                           stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
    actual = {}
    for line in check.stdout.decode().splitlines():
        digest, name = line.split('  ', 1)
        actual[name.removeprefix('./')] = digest
    if actual != expected:
        raise RuntimeError('Restored files differ')
    print(f'Restored media/config bytes verified: {len(expected)} files')

if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('Media verification failed; filenames and contents withheld.', file=sys.stderr)
        sys.exit(1)
