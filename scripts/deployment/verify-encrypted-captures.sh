#!/usr/bin/env bash
# Streams plaintext into validators only; never writes decrypted backup files.
# Archive integrity checks are not a database restore test.
set -euo pipefail
[[ $# == 2 ]] || { echo 'Usage: verify-encrypted-captures.sh BACKUP_DIRECTORY AGE_IDENTITY' >&2; exit 2; }
backup_directory=$1
backup_identity=$2
shasum -a 256 -c "$backup_directory/SHA256SUMS"
for capture_name in application.pgcustom temporal.pgcustom; do
  age -d -i "$backup_identity" "$backup_directory/$capture_name.age" |
    python3 -c 'import sys; signature=sys.stdin.buffer.read(5); assert signature == b"PGDMP", "Invalid PostgreSQL archive header"; import shutil; shutil.copyfileobj(sys.stdin.buffer, open("/dev/null", "wb"))'
  printf 'Decryption and PostgreSQL archive header verified: %s\n' "$capture_name"
done
for capture_name in uploads-config.tar deployment-config.tar; do
  age -d -i "$backup_identity" "$backup_directory/$capture_name.age" | tar -tf - > /dev/null
  printf 'Decryption and tar structure verified: %s\n' "$capture_name"
done
for capture_name in application-globals.sql temporal-globals.sql; do
  age -d -i "$backup_identity" "$backup_directory/$capture_name.age" > /dev/null
  printf 'Authenticated decryption verified: %s\n' "$capture_name"
done
printf '%s\n' 'Integrity checks passed. Database restore, Redis and Elasticsearch recovery remain separate requirements.'
