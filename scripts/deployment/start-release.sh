#!/usr/bin/env bash
# Run existing entry points; never push database schemas or run migrations.
set -euo pipefail
cd /app
pids=()
shutdown() {
  local status=$1
  trap - TERM INT
  kill -TERM "${pids[@]}" 2>/dev/null || true
  wait "${pids[@]}" 2>/dev/null || true
  exit "$status"
}
trap 'shutdown 143' TERM
trap 'shutdown 130' INT
(cd apps/backend && exec node --experimental-require-module dist/apps/backend/src/main.js) &
pids+=("$!")
(cd apps/orchestrator && exec node --experimental-require-module dist/apps/orchestrator/src/main.js) &
pids+=("$!")
(cd apps/frontend && exec node ../../node_modules/next/dist/bin/next start -p 4200) &
pids+=("$!")
nginx -g 'daemon off;' &
pids+=("$!")
status=0
wait -n "${pids[@]}" || status=$?
# Any child exiting should restart the whole application container.
if [[ "$status" == 0 ]]; then status=1; fi
shutdown "$status"
