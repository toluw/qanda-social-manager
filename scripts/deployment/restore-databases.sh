#!/usr/bin/env bash
# Restore only into the isolated local project. Never import production globals.
set -euo pipefail
[[ $# == 2 ]] || { echo 'Usage: restore-databases.sh BACKUP_DIRECTORY AGE_IDENTITY' >&2; exit 2; }
backup_directory=$1
backup_identity=$2
script_directory=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
compose=(docker --context desktop-linux compose -f "$script_directory/compose.restore.yaml")
for spec in 'application-db application_restore application.pgcustom' 'temporal-db temporal_restore temporal.pgcustom'; do
  read -r service database archive <<< "$spec"
  # Refuse to overwrite an existing restore or other populated database.
  table_count=$("${compose[@]}" exec -T "$service" psql -U staging -d "$database" -Atqc \
    "SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE c.relkind IN ('r','p') AND n.nspname NOT IN ('pg_catalog','information_schema')")
  [[ "$table_count" == 0 ]] || { echo "Refusing to restore into populated local service: $service" >&2; exit 1; }
  # Database data or errors can contain private values. Keep restore diagnostics
  # inside the disposable container; print only a status, never raw data.
  if age -d -i "$backup_identity" "$backup_directory/$archive.age" |
    "${compose[@]}" exec -T "$service" sh -c \
      'umask 077; exec pg_restore -U staging -d "$1" --exit-on-error --single-transaction --no-owner --no-privileges > /tmp/qanda-restore.log 2>&1' sh "$database"; then
    printf 'Local database restore passed: %s\n' "$service"
  else
    echo "Restore failed for $service; inspect diagnostics privately in the local container." >&2
    exit 1
  fi
done
