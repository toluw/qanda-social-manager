#!/usr/bin/env bash
# Read-only Docker inventory. Run on the production host before planning an image replacement.
# Deliberately does not print container environment, logs, credentials, or Compose interpolation.
set -euo pipefail

command -v docker >/dev/null || { echo 'Docker CLI is required on this host.' >&2; exit 1; }
docker version --format 'Docker server: {{.Server.Version}}'

services=(postiz postiz-postgres postiz-redis temporal temporal-admin-tools temporal-ui temporal-elasticsearch temporal-postgresql)
for service in "${services[@]}"; do
  if ! docker container inspect "$service" >/dev/null 2>&1; then
    printf 'Container not found or inaccessible: %s\n' "$service"
    continue
  fi
  docker container inspect --format 'Container: {{.Name}} Status: {{.State.Status}} ImageID: {{.Image}}' "$service"
  docker container inspect --format '{{range .Mounts}}Mount: {{.Type}} {{.Name}} {{.Source}} -> {{.Destination}} RW={{.RW}}{{println}}{{end}}' "$service"
done

image_id=$(docker container inspect --format '{{.Image}}' postiz)
docker image inspect --format 'Application image: {{.Id}} OS={{.Os}} Arch={{.Architecture}} Digests={{json .RepoDigests}}' "$image_id"
docker container inspect --format 'Compose project: {{index .Config.Labels "com.docker.compose.project"}} Working directory: {{index .Config.Labels "com.docker.compose.project.working_dir"}} Files: {{index .Config.Labels "com.docker.compose.project.config_files"}}' postiz
docker container inspect --format 'Port bindings: {{json .HostConfig.PortBindings}}' postiz

# Select version information and hashes only. No environment or package scripts are printed.
docker exec postiz node -e '
  const fs = require("fs"), crypto = require("crypto");
  for (const file of ["/app/package.json", "/app/apps/frontend/package.json"]) {
    if (!fs.existsSync(file)) continue;
    const data = fs.readFileSync(file), pkg = JSON.parse(data);
    console.log(JSON.stringify({file, version: pkg.version, next: pkg.dependencies?.next,
      sha256: crypto.createHash("sha256").update(data).digest("hex")}));
  }
  try { console.log("Installed Next.js: " + require("/app/node_modules/next/package.json").version); }
  catch { console.log("Installed Next.js package was not found at /app/node_modules/next."); }
  const schema = "/app/libraries/nestjs-libraries/src/database/prisma/schema.prisma";
  if (fs.existsSync(schema)) console.log("Prisma schema SHA256: " + crypto.createHash("sha256").update(fs.readFileSync(schema)).digest("hex"));
'

printf '%s\n' 'Inventory only: no backups, migrations, image pulls, restarts or configuration changes performed.'
