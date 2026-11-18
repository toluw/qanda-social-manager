# Building Q and A Social Manager and preparing its source offer

These instructions describe the checked-out Postiz v2.25.3 derivative. They have
not yet been validated by a clean build in this workspace. Source publication
and production deployment remain pending and require separate authorization.

## Source distribution contents

Publish the complete modified application's source, not only the frontend diff.
Retain the upstream copyright notices, root `LICENSE`, `THIRD_PARTY_NOTICES.md`,
font licenses, modification record, package manifests, lockfile, workspace and
compiler configuration, and build/install/run scripts. Include the frontend,
backend, shared libraries and orchestrator needed for this version, even though
the Q and A changes are frontend-only. Resolve any required external source or
dependency notice obligations before calling the distribution complete.

Do not publish real environment files, credentials, OAuth tokens, private keys,
database exports, uploads or other user data. Review tracked files and Git
history before publication. Review operator-only documents, including the
branding brief, before deciding whether they belong in the public repository.
Keep safe example configuration and document required runtime inputs without
including actual deployment secrets.

## Local build preparation

Use an isolated development environment. Do not connect to production databases,
Redis, Temporal, storage, OAuth credentials or social accounts for build checks.

1. Obtain the exact source revision from
   https://github.com/toluw/qanda-social-manager. Use the release commit recorded
   in the source configuration rather than an unpinned branch.
2. The root manifest specifies Node.js `22.23.4` and pnpm `10.6.1`. Its Volta field
   instead specifies Node `20.17.0`; resolve that discrepancy for the release
   build and record the toolchain actually validated. Python 3 is needed only
   for the static source-page preparation script.
3. From the repository root, install the locked dependencies:

   ```sh
   pnpm install --frozen-lockfile
   ```

   Review install hooks before running this in a new environment. The root hook
   generates the Prisma client; the frontend hook runs `scripts/fetch-gtm.mjs`.
   Installation may need network access. Do not run database push/reset scripts
   as part of a frontend build.
4. Prepare private, ignored local configuration from the repository's example
   configuration and upstream setup documentation, using only isolated services.
   This document does not authorize changes to existing environment files.
5. Build just the frontend:

   ```sh
   pnpm --filter ./apps/frontend run build
   ```

   To build the frontend, backend and orchestrator together, the repository's
   existing command is `pnpm run build`. This is documented for source recipients;
   it has not been executed as part of the branding work.
6. Candidate frontend checks, after dependency setup:

   ```sh
   pnpm exec tsc -p apps/frontend/tsconfig.json --noEmit --incremental false
   pnpm --dir apps/frontend exec eslint .
   git diff --check
   ```

   No frontend lint/test scripts exist. Root `pnpm test` uses Jest configuration
   importing `@nx/jest`, which is not declared in the root manifest. Resolve the
   baseline before claiming test coverage; do not report an unrun check as passing.
7. For local frontend development, `pnpm --filter ./apps/frontend run dev` starts
   Next on port 4200 and loads the root local environment through dotenv. A
   functional integration test also requires isolated backend and supporting
   services; frontend-only rendering does not verify publishing or scheduling.
   The root `pnpm run start:prod:frontend` runs the built frontend, not the other
   application services. Neither command deploys to the VPS.

## Configurable Source Code offer

The source page is `/legal.html#source`. Publication has now been verified for
the revision below. Its settings are in
`apps/frontend/source-code-config.json`, not an environment file:

| Field | Current value | Required before enabling links |
| --- | --- | --- |
| `repositoryUrl` | `https://github.com/toluw/qanda-social-manager` (approved; publication pending) | Operator-approved company GitHub repository URL ending in `/qanda-social-manager` |
| `releaseCommit` | `0dd05df2ad34499f48bde7dfb819a52f374394a4` | Full 40-character commit of the complete published modified source |
| `urlApproved` | `true` | Explicit operator approval of the final URL |
| `sourcePublished` | `true` | Verified public publication of the complete modified source |

While either flag is false, the page shows a pending notice and has no derivative
download link. The upstream Postiz link remains attribution only. Do not enter a
guessed company URL, the upstream repository, or the unmodified upstream commit.

Render the current state with:

```sh
python3 apps/frontend/scripts/prepare-source-page.py
```

The script is a local static-file generator. It does not access GitHub, verify
publication, or publish/deploy anything. Run it after changing source settings and
before the frontend build. It is deliberately not an automatic release gate;
the manual verification below is still mandatory.

## Before declaring source access complete

1. Receive the approved URL and publication authorization from the operator.
2. Publish and verify the complete source at an immutable company release commit.
   Ensure it contains these modifications, the preparation script, applicable
   notices and enough instructions/configuration examples to reproduce the build.
3. Record that commit and the approved URL, and set the two flags only after their
   conditions are satisfied. Generate the legal page for that release. Record
   these generation inputs with the release so the generated page is reproducible;
   do not confuse the base upstream commit with the modified source revision.
4. Open both generated GitHub links without authentication. Download and inspect
   the archive; confirm required files, dependencies and build instructions are
   present. A valid-looking URL or successful page render is not verification.
5. Check that the application artifact corresponds to the offered source, with
   documented generated files and release inputs. Complete a clean build and
   isolated staging verification before release.
6. Confirm the Source Code link is discoverable and works signed in and signed
   out. Keep source access available for the version users are running.
7. Keep AGPL/font public copies identical to their originals and synchronize
   `apps/frontend/public/third-party-notices.txt` with `THIRD_PARTY_NOTICES.md`.
8. Resolve the pending Charter font provenance and dependency notice inventory.
   Retain all applicable notices when publishing the complete source.

Until the final URL is approved and modified source is published and verified,
source access is **incomplete**. No application publication or deployment should
proceed on the basis of this placeholder preparation.

## Publication verification recorded

The company URL above was approved and source revision `0dd05df2ad34499f48bde7dfb819a52f374394a4`
was downloaded anonymously on 2026-11-17. Required source files were present.
The source-page follow-up is reproducible from that commit using the configuration
values in the table and the included preparation script. It changes generated
legal/source information and publication records only. Build verification,
Charter licensing and the dependency notice inventory remain pending; the
placeholder descriptions above document how disabled states behave, not the
current publication state. Deployment remains separately authorized.
