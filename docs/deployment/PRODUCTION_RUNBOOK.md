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
6. Retain the exact old image and prepare `Dockerfile.rollback` from a local tag
   verified against its image ID. This preserves its application artifacts but
   uses the schema-safe startup wrapper; the original image's CMD automatically
   invokes Prisma schema push and must not be used blindly for rollback.
   Roll back to that tested wrapper image and recreate only the app service,
   provided no incompatible data/schema change occurred. Never derive it by
   committing the running container: that could capture private environment data.
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
and outbound probes failed. Application workers subsequently ran only in this
isolated environment during the final image tests.
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
The corrected build succeeded from source
`92113bfdfa70b2048a6e940da4caec6f68f8c08c`:
https://github.com/toluw/qanda-social-manager/actions/runs/44322608511.
Its archive checksum and source revision were verified on both the Mac and VPS.
Candidate tag: `qanda-social-manager:92113bfdfa70b2048a6e940da4caec6f68f8c08c`.
Candidate image ID:
`sha256:b9e087d74c5240350c675368ef07361b7096b11630ef152140e059662f3de15f`.

Final Linux image checks passed: Next.js 16.4.6, bcrypt and Temporal modules,
DOMPurify, unchanged Prisma schema, synchronized public AGPL/font/attribution
notices, source offer pinned to the built revision, no root environment file,
and no installed Polotno dependency. Browser tests passed at widths 390 and 1440
for login, registration and legal pages with no overflow/broken images. Real
disposable-account registration/sign-in and authenticated calendar, media and
settings pages passed with zero page/route errors. Real backend CORS preflights
were forwarded; no application API responses were fabricated. Existing restored
media was served over HTTP with unchanged bytes. The orchestrator's health
endpoint successfully connected to the restored Temporal namespace.

The app remained exclusively on the internal network, and a direct publishing
provider connectivity probe failed. Browser requests outside the permitted local
transport were blocked. No production credentials/data were sent to GitHub.
The test app and browser proxy are stopped after testing; their generated signing
keys and sessions are discarded on stop/restart. A test-harness streaming timeout
initially printed a disposable staging token; that session was invalidated and
route errors now suppress request details. No production token was printed.

The exact old application image is retained as `qanda-postiz-original:20261118`.
`qanda-postiz-rollback:20261118` preserves its original filesystem layers and adds
only the schema-safe startup wrapper; command, syntax and entrypoint-file checks
passed. Rollback image ID:
`sha256:18c533c823a4ff0d801295ba04355176e960590fee358479091a420733d01255`.
All 55 declared production environment settings matched the running container
in a private comparison. No values were printed.

The approved maintenance window ended before preparation was complete. The live
application still returns HTTP 200 on the original image; its container ID was
verified unchanged. No production Compose file, environment file, application
service, database schema, persistent mapping, OAuth setting, Caddy or DNS record
has been changed. Fresh coordinated backups, a new maintenance window and live
post-replacement checks remain required. The operator will run the final actual
scheduled publishing test. Existing-user sign-in/provider authorization are live
checks, not claims made by the disposable-account staging test.
Host addresses and private backup locations are omitted from this public file.

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
immutable candidate tag in `QANDA_STAGING_IMAGE`. A fixed reverse proxy binds only
localhost ports 4008 (HTTP) and 4443 (local test TLS). The application itself stays
exclusively internal and uses disposable authentication settings, the cloned
`application_stage` database and separate stage uploads/config volumes. It never
loads a production environment file. Do not use it with production Compose.

`verify-restored-media.py` checks every restored file's bytes against the encrypted
archive. `verify-temporal-recovery.py` checks internal Temporal health and one
application history while suppressing private values. `smoke-staging.cjs` requires
Playwright and Chrome; it blocks external browser requests and forwards embedded
production API URLs to the local API. It creates a disposable local account for
registration/authenticated checks. These are staging tests, not proof of actual
provider publication or existing-user sign-in. These image tests passed as
recorded above. The TLS proxy is required to forward the production bundle's
absolute HTTPS API URLs without buffering streaming responses. Its disposable
self-signed certificate lives only in the dedicated local Docker volume, and
certificate verification is relaxed only inside the isolated test browser.

Before starting the proxy, create its local certificate once (with the candidate
image already loaded and `QANDA_STAGING_IMAGE` set):

```sh
docker --context desktop-linux run --rm --platform linux/amd64 --network none \
  -v qanda-restore-check_proxy-tls:/tls --entrypoint openssl "$QANDA_STAGING_IMAGE" \
  req -x509 -newkey rsa:2048 -nodes -keyout /tls/key.pem -out /tls/cert.pem \
  -days 1 -subj /CN=127.0.0.1 -addext subjectAltName=IP:127.0.0.1
```

Never reuse a production/SSH private key or import this test certificate into the
system trust store. Run only the controlled browser harness against this image;
its compiled API URL remains the production domain. Stop local app/proxy services
when the harness finishes. Restored data and all Docker volumes stay available.
