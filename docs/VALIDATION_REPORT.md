# Validation report — 2026-11-18

Source under review: published branding revision aeb5092eef60ebef105c390f5732230fb08ca0d3,
plus the local legal-page wrapping fix and this validation evidence.
Upstream comparison: a5affe62c74e39c1e7ac960d50d8418b807d532c (v2.25.3).

## Completed checks

- Official Node 22.23.4 archive SHA-256 verified; pnpm 10.6.1 installed in /tmp.
- Frozen dependency installation completed with lifecycle scripts disabled and
  a temporary package store. The tracked lockfile was not changed.
- Prisma 6.5.0 client generated locally. No schema push, migration or database
  access was performed by this command.
- Frontend TypeScript check passed with `tsc -p apps/frontend/tsconfig.json
  --noEmit --incremental false`. The identical upstream check also passed after
  client generation.
- Frontend ESLint: 615 errors and 1,877 warnings. Untouched upstream: 615 errors
  and 1,880 warnings. Comparing file/rule/diagnostic summaries while ignoring
  path and line-number shifts found no new diagnostic categories/occurrences.
  Lint is not passing; existing errors remain.
- Standalone Sass compilation and Tailwind compilation passed for the edited
  global stylesheet and theme configuration.
- Local headless Chrome checked legal.html at 390px and 1440px: title and source
  download link present, icon loaded, no horizontal overflow. Fixed wrapping of
  the long commit hash on narrow screens. No auth or backend services needed.
- A compiled-theme browser fixture confirmed black primary fill and white label
  in both themes, white accent in dark mode and black accent in light mode.
  This fixture does not verify every rendered application component.
- Root test command fails before test execution: jest.config.ts imports missing
  @nx/jest. No test pass or coverage is claimed.

## Build status

The default Turbopack build was cancelled after prolonged compilation without
visible progress. Webpack exhausted the default Node heap. The 6 GB heap retry compiled successfully in 6.7 minutes and passed Next
TypeScript, then failed collecting preview-page data because bundled JSDOM
could not locate its package-relative default-stylesheet.css. Added
`serverExternalPackages: ['isomorphic-dompurify']` to the frontend Next config.
Direct native package loading/sanitization succeeds. The corrected build compiled
in 6.4 minutes, passed Next TypeScript, collected page data, generated static
pages and collected traces. It then exited 1 with SecurityFatalError: the pinned
Next.js version is affected by a known vulnerability. No final passing build is
claimed. The security advisory needs review and a compatible update; no security
upgrade or production deployment was performed. No successful production
build or authenticated scheduling/integration browser run is claimed here.
The build also emitted a Next.js security advisory warning and a Sentry
instrumentation warning. Version upgrades require compatibility review rather
than silently changing this same-version derivative.

## Dependency/license evidence

See dependencies/README.md, installed-manifests.csv and bundled-notices.txt.
Preserved upstream AGPL and active Plus Jakarta Sans OFL notices. Inspected
Charter/SFNS/Chirp placeholders are zero bytes; Charter webfont URLs refer to
absent files. No proprietary replacement font was added.

Commercial Polotno entitlement, Meta Platform License terms, FSL build-tool
terms, LGPL/MPL obligations and packages without complete metadata still need
release-specific review. Evidence collection is not full legal clearance.

## Remaining release work

- Resolve the pinned Next.js advisory through a compatible upgrade and obtain
  a final passing build.
- Complete authenticated UI and isolated staging checks for calendar, uploads,
  existing connections, drafts and a real scheduled test publication.
- Verify Polotno entitlement without exposing the key and resolve outstanding
  dependency obligations using the collected license evidence.
- Confirm production source/image compatibility, backups and rollback plan.
- Include each final source change in the company repository and update the
  offered source revision for the actual release. The current offer points to
  published application revision 0dd05df2ad34499f48bde7dfb819a52f374394a4;
  subsequent source-page generation is documented in MODIFICATIONS.md.

No deployment or production infrastructure/database/authentication change was
performed during these checks.

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

Post-removal checks: frontend typecheck passed; targeted ESLint comparison found
no new diagnostics in media/billing files. Frozen installation accepted the
manifest/lockfile, with Polotno absent from node_modules and all unrelated pinned
resolutions unchanged. Webpack compiled successfully in 2.4 minutes, passed Next
TypeScript, generated pages and completed tracing, then exited 1 due to the
existing Next SecurityFatalError. The Next security upgrade remains pending.
