# Installed dependency notice evidence

Collected on 2026-11-18 after a frozen install of the checked-in pnpm lockfile,
using Node 22.23.4 and pnpm 10.6.1. Install lifecycle scripts were disabled;
Prisma client generation was subsequently run locally without database changes.

`installed-manifests.csv` records 3,483 distinct name/version pairs discovered
under node_modules. This includes transitive packages, build tools and manifests
inside package examples; it is not a runtime bundle list. Local machine paths
are omitted. `bundled-notices.txt` preserves nonempty top-level LICENSE, COPYING
and NOTICE files found beside those manifests, grouped by SHA-256 of identical
contents. Missing metadata is labeled UNKNOWN, not assumed permissive. The
actual license file takes precedence over shorthand manifest metadata.

## Material findings requiring release review

- Polotno's installed LICENSE.md permits free noncommercial/local development
  use and requires a purchased license for commercial use. Verify existing
  entitlement for this installation; do not expose its license key.
- facebook-nodejs-business-sdk 21.0.5 carries Meta's Platform License. Preserve
  its copyright notice and applicable platform terms.
- @sentry/cli and its platform binaries include FSL-1.1-MIT licensing. These are
  build tools; review their own terms and any redistribution separately.
- rpc-websockets and sharp/libvips include LGPL obligations; MPL packages and
  packages with missing metadata also require a distribution-specific review.
- Some packages have no top-level notice file; this collection is evidence, not
  a declaration that every dependency obligation has been satisfied. Inspect
  other package locations and upstream sources as necessary.

The tracked Charter, SFNS and Chirp font files are empty upstream placeholders,
not usable font binaries. No references to these files were found in the
inspected provider code. The Charter stylesheet references absent webfonts.
Do not invent copyright notices or replace these with proprietary font data.
Plus Jakarta Sans is bundled with its existing SIL OFL notice, preserved intact.

No original dependency license has been replaced or relicensed as AGPL.

Operator confirmation (2026-11-18): the organization does not have a commercial
Polotno license covering this installation. Commercial release using that editor
remains blocked until appropriate entitlement is obtained or an approved
replacement is implemented and verified. No editor was disabled or replaced
during this validation.

Operator confirmation: the organization has no commercial Polotno license.
Commercial use of the bundled design editor must not be treated as cleared.
A removal/replacement plan or purchased entitlement is required before release.
No editor removal has been authorized or implemented in this validation pass.

## Polotno removal — 2026-11-18

At the operator's request, removed the Polotno editor, both editor entry buttons,
its components and stylesheet, dependency/lockfile entries, frontend key plumbing
and the billing feature advertising an advanced picture editor. Environment files
and backend/provider behavior were not changed. Upload, select, clear, AI image/
video generation and media settings remain. A frozen offline install accepted
the changed manifest/lockfile and removed 412 installed packages; unrelated pinned
versions were retained. The dependency evidence was refreshed after removal.
Earlier Polotno entitlement findings describe the pre-removal checkout; Polotno
is no longer an installed application dependency. Other dependency reviews and
the pinned Next.js advisory still apply.
