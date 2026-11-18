#!/usr/bin/env bash
# Read-only online captures; these alone do not satisfy restore/staging gates.
set -euo pipefail
umask 077
[[ $# == 3 ]] || { echo 'Usage: capture-online-backups.sh SSH_ALIAS AGE_RECIPIENT BACKUP_DIRECTORY' >&2; exit 2; }
backup_host=$1
backup_recipient=$2
backup_directory=$3
[[ "$backup_host" != -* && "$backup_host" != *[[:space:]]* ]] || exit 2
[[ "$backup_recipient" == age1* && -d "$backup_directory" ]] || exit 2
command -v age >/dev/null
command -v ssh >/dev/null
capture() {
  local filename=$1 remote_command=$2
  local target="$backup_directory/$filename.age"
  [[ ! -e "$target" && ! -e "$target.partial" ]] || { echo "Refusing to overwrite $filename" >&2; exit 1; }
  ssh -T -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=10 \
    "$backup_host" "$remote_command" | age -r "$backup_recipient" -o "$target.partial"
  mv "$target.partial" "$target"
  shasum -a 256 "$target" >> "$backup_directory/SHA256SUMS"
  printf 'Encrypted capture completed: %s\n' "$filename"
}
capture application.pgcustom 'docker exec postiz-postgres sh -eu -c '\''exec pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom'\'''
capture application-globals.sql 'docker exec postiz-postgres sh -eu -c '\''exec pg_dumpall -U "$POSTGRES_USER" --globals-only'\'''
capture temporal.pgcustom 'docker exec temporal-postgresql sh -eu -c '\''exec pg_dump -U "$POSTGRES_USER" -d temporal --format=custom'\'''
capture temporal-globals.sql 'docker exec temporal-postgresql sh -eu -c '\''exec pg_dumpall -U "$POSTGRES_USER" --globals-only'\'''
capture uploads-config.tar 'docker exec -u 0 postiz tar -C / -cf - uploads config'
capture deployment-config.tar 'tar -C /opt -cf - postiz'
cat > "$backup_directory/STATUS.txt" <<'STATUS'
Online captures only. Production was not stopped. Database dumps each have their
own transaction snapshot; uploads/configuration were captured while online.
Redis and Elasticsearch recovery coverage is pending. No restore test has run.
Do not mark the backup or production deployment gate complete from these files.
STATUS
