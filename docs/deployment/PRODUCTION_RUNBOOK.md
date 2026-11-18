# Production deployment readiness

This is a preparation record, not evidence that a deployment or restore test has run.
The operator requested production deployment. Credentials, DNS, Caddy, service
names, projects, networks and volume mappings remain unchanged.

## Candidate source

- Security branch: `security/next-16.4.6`, application patch `bf3742e3`.
- Next.js and eslint-config-next 16.4.6; Polotno removed.
- Frontend Webpack production build and TypeScript passed locally.
- Signed-out login, registration and legal pages passed local browser checks.
- Existing lint failures and authenticated integration/staging checks remain.
- Backend and orchestrator builds pass locally when run sequentially with
  NODE_OPTIONS=--max-old-space-size=6144. Their default heaps were insufficient.
  These compilation checks do not validate a Linux container or live services.

## Required information before replacement

1. Approved SSH alias or username/host and available authentication method.
   Never put private keys, tokens or passwords in this repository.
2. Run `bash scripts/deployment/preflight.sh` on the host. This inventories
   container/image IDs, architecture and storage without displaying environment
   values. It does not change configuration. Compare the source fingerprint with
   the live image; a shared tag alone does not establish compatibility.
3. Confirm the live Compose files and project directory. Do not replace them
   with this repository's example. Preserve `https://postiz.qanda.ng` and current
   callbacks and environment values.
4. Confirm verified off-server backups, a successful restore test, isolated
   staging results and a maintenance window with no in-flight/near-due publishes.

## Container artifact gap

Docker Desktop is now available locally. There is no validated production image
of this derivative yet. The operator authorized an artifact-only GitHub Actions
build because the Mac has 8 GiB RAM and Docker currently has about 4 GiB.

The checked-in `Dockerfile.dev` invokes root `pnpm run pm2`, which leads to
`prisma-db-push` on startup. Do not run this against live production merely to
rebrand the frontend. The legacy helper build script references absent targets;
its create script kills/removes a named container. Neither is a deployment path.

After inspecting the live image and establishing source compatibility, prepare
an image recipe/startup path that matches its filesystem/process layout, uses a
frozen lockfile, builds for the VPS architecture and does not automatically push
schemas. Retain licenses/source notices in the artifact; the current generic
`.dockerignore` excludes markdown and LICENSE files and needs an explicit
release-context review. Never copy actual environment files into a build image.
Use a capable build host or reviewed CI; do not build on the shared production VPS.
Record the immutable source commit, generation inputs, image tag and digest.

## Backups and staging

Back up app PostgreSQL, Temporal PostgreSQL, config/uploads, Redis state and
other required Temporal storage using database-consistent methods. Keep encrypted
off-server copies, the existing Compose configuration and the exact old app image.
Verify restore procedures before replacing anything. A copy of a running database
data directory alone is not a consistent backup.

Staging requires separate databases, Redis, Temporal, uploads/config and network
isolation. Restored production schedules and credentials must not be allowed to
publish or send notifications. Keep outbound publishing blocked until dedicated
test channels are substituted. Verify login, uploaded files, drafts, existing
schedule views and an actual test scheduled publication before production.

## Application-only replacement, after all gates pass

1. Pre-download the tested image and retain the exact current one for rollback.
2. Review the resolved service configuration securely without logging secrets.
3. Change only `services.postiz.image` in the existing production Compose file
   to the approved immutable release reference. No fresh Compose project.
4. From the original directory and with its original project/files, recreate
   only the application: `docker compose up -d --no-deps --no-build --pull never postiz`.
5. Check application health, login, channels, drafts, uploads, scheduled jobs,
   Temporal errors and a controlled publication. Keep the maintenance window open
   until those checks pass. Record observations, not simulated success.
6. Roll back by restoring the old application image reference and recreating
   only that service, provided no incompatible data/schema change occurred.
   If schema differences are discovered at any point, stop and reassess.

Never run database resets, volume pruning, `docker compose down -v`, automatic
stack upgrades or `latest` image replacement. Source publication and production
deployment are separate: publish the exact release source and update its source
offer after the image recipe and release revision are finalized.

## Current readiness status

SSH key access is now working. Read-only production inventory confirmed a Linux
amd64 application image and unchanged Compose project/service/volume mappings.
The live root and frontend package manifests match the v2.25.3 source revision,
and the Prisma schema SHA256 matches the candidate:
`fc4f5ca720425c3b071a1f46030713d9af8729b4472aba9f77d1684b40df772d`.
An additional comparison found all 377 backend, orchestrator and shared backend
library source files identical to v2.25.3 in the running image. Frontend/build
toolchain differences are intentional; this is not a claim of whole-image identity.

The operator selected encrypted off-server backups and isolated Docker staging
on the local Mac. `scripts/deployment/capture-online-backups.sh` captures database
dumps, database role definitions, uploads/config and deployment configuration
directly into age-encrypted files outside Git. It does not stop production or
claim a coordinated snapshot. Keep the decryption identity separate from the
encrypted captures and arrange secure recovery storage for that identity.

Initial encrypted captures passed checksum/authenticated-decryption checks and
archive structure checks. The operator freed disk space (about 54 GiB available)
and finished Docker setup. Local database restore tests passed: application has
88 public tables, Temporal has 37, neither reports unvalidated constraints.
The restored application contains 3 integrations, 50 posts and 121 media rows;
Temporal contains 61 execution rows and 30 current-execution rows. No private
row values or credentials were printed.

Redis was exported via `redis-cli --rdb -`, encrypted off-server, validated with
`redis-check-rdb` and loaded into the local isolated instance (zero keys, matching
the production check). Uploads/config restored into a dedicated volume: 128 files.
The Temporal visibility index was exported through a read-only scroll, encrypted
off-server and restored into isolated Elasticsearch 7.17.27: 61 documents.
Its mappings and restorable settings were retained. The managed `.geoip_databases`
index is not part of this logical application export. These captures have
different timestamps and are not a coordinated service snapshot.

The restore network reports `Internal=true`, database ports are not published,
and an outbound TCP probe failed. No application workers have been started.
Temporal 1.28.1 recovered successfully with schema setup disabled, reports
`SERVING`, returns 31 default-namespace visibility entries and can read a restored
application workflow's event history. All 128 restored media/config file hashes
match the decrypted archive. The dynamic config must belong to UID 1000 in its
local restored volume. The local Temporal database must retain the name
`temporal`, because the restored schema-version record includes that name.

The operator approved an artifact-only GitHub Actions build, now started from
published source `f94f8b54498555a9e8948325efa6daf3319ebcf6`. Docker recipe static
checks passed without warnings and that image build succeeded. A runtime settings
check then confirmed live `NODE_ENV` is unset; the release recipe's added
production default was removed to preserve existing analytics cache behavior.
The corrected recipe requires a new image build and final artifact tests.
No private production data or environment files
were provided to GitHub. Authenticated app tests, a validated image and full
staging checks remain outstanding. Fresh coordinated backups and maintenance
checks are still needed immediately before any production replacement.
No production services have been restarted or replaced. Host addresses and
private backup locations are deliberately omitted from this public document.

## Isolated restore rules

- Use dedicated local volumes and project, PostgreSQL 17 for the application and
  PostgreSQL 16 for Temporal. Use disposable local credentials. Do not import the
  production environment or role-password definitions into staging.
- Keep services on an internal Docker network and bind UI ports to localhost.
  Verify blocked outbound traffic before starting any restored schedules or workers.
- Restore the database dumps into disposable databases. Compare row counts and
  relationships, verify media, and test recovery with separate Redis, Temporal
  and Elasticsearch storage. Never attach any production volume to staging.
- `scripts/deployment/verify-encrypted-captures.sh` checks encrypted checksums,
  authenticated decryption, database archive headers and tar structure without
  writing decrypted files. Passing it does not establish a successful restore.
- Preserve a secure recovery copy of the age identity on a separate device.
  Losing the identity makes these encrypted captures unusable.

## Application staging harness

Combine `compose.restore.yaml` and `compose.staging.yaml` with a locally loaded
immutable candidate tag in `QANDA_STAGING_IMAGE`. The latter binds only localhost
port 4008 and uses disposable authentication settings, the cloned
`application_stage` database and separate stage uploads/config volumes. It never
loads a production environment file. Do not use it with production Compose.

`verify-restored-media.py` checks every restored file's bytes against the encrypted
archive. `verify-temporal-recovery.py` checks internal Temporal health and one
application history while suppressing private values. `smoke-staging.cjs` requires
Playwright and Chrome; it blocks external browser requests and forwards embedded
production API URLs to the local API. It creates a disposable local account for
registration/authenticated checks. These are staging tests, not proof of actual
provider publication or existing-user sign-in. Final image tests remain pending.
