# Q and A Social Manager modification record

Date: 2026-11-17

Upstream: Postiz `v2.25.3`, commit
`a5affe62c74e39c1e7ac960d50d8418b807d532c`.

These are Q and A App branding modifications to an existing application, not a
claim of original authorship. Modifications to the covered application retain
AGPL-3.0 licensing. See `LICENSE` and `THIRD_PARTY_NOTICES.md`.

## Changes prepared locally

1. Replaced embedded application marks with the operator-supplied Q and A icon,
   added the product wordmark and generated favicon sizes from that artwork.
2. Standardized page titles and descriptions using frontend brand constants.
3. Updated selected interface copy and translation values while preserving
   integration identifiers, commands and translation keys.
4. Removed upstream testimonials and unsupported marketing claims from the
   reviewed authentication/billing screens. Identified tutorial content as
   upstream Postiz material. Set registration links to the operator-approved
   Q and A terms and privacy URLs.
5. Added a public legal page, prominent legal/source links, public copies of the
   AGPL and Plus Jakarta Sans license, and this attribution/change record.
   Moved the supplied icon to a root-level public URL so the existing proxy
   matcher does not redirect signed-out image requests.
6. Prepared a configurable, disabled-by-default Source Code offer for the planned
   public company repository `qanda-social-manager`. Added a static-page
   preparation script and documented source publication/build preparation.

7. Applied the operator-approved monochrome palette on 2026-11-17: black
   action fills with white labels, neutral secondary actions, theme-aware
   black/white selection accents and loading indicators. Existing neutral
   backgrounds, provider imagery and semantic status/chart colors are retained.

Backend, scheduling, payment handling, OAuth behavior, credentials, databases,
service definitions, persistent storage and production infrastructure have not
been changed. The production image/source correspondence remains unverified.

## Approved monochrome palette — 2026-11-17

Application accents use black and white from the operator-approved icon with
existing neutral backgrounds. Primary action fills remain black with white
labels; secondary accents use neutral gray. Text, selection borders and spinners
use white in dark mode and black in light mode. Dark controls have a neutral
edge. Provider previews, provider icons, status colors and chart category colors
are preserved. Browser verification remains pending dependency installation.

## Release gates

Palette update (2026-11-17): the operator approved black and white from the
supplied icon with existing neutral backgrounds. Application actions now use
black/gray fills and white labels, with theme-aware black/white selection and
focus accents. Updated the spinner, application accent classes and editor
mentions. Provider preview palettes, chart category colors and semantic status
colors are retained. Static contrast calculations passed for the primary text
pairs; rendered browser, build and lint verification remain pending.

- Obtain the approved company repository URL and verify that complete modified
  source is public. Then configure `apps/frontend/source-code-config.json` and
  regenerate the Source Code section of `apps/frontend/public/legal.html` using
  the preparation script. The page currently states publication is pending.
  The upstream project link is attribution only, not a substitute. Configuration
  alone is not evidence of publication or completion of the source requirement.
- Resolve Charter font licensing and complete the dependency notice inventory
  against the installed, locked dependency versions.
- Preserve the root license and font notice. Keep their public copies identical
  when source notices change, and keep the legal page and notices consistent.
- Run frontend build/typecheck/lint and browser checks after dependencies are
  installed. New Stage 4 copy currently falls back to English in other locales.
- Confirm signed-in and signed-out access to `/legal.html`, `/license.txt`,
  `/font-license.txt`, `/third-party-notices.txt`, and `/q-and-a-icon.png`.
- Before any deployment, follow the separate approval, source compatibility,
  backup and isolated staging requirements in `docs/BRANDING_BRIEF.md`.

No build, production deployment or source publication is claimed by this record.

## Source publication record — 2026-11-17

Published the full modified repository and preserved upstream history to
https://github.com/toluw/qanda-social-manager, branch `main`. The source offer
references `0dd05df2ad34499f48bde7dfb819a52f374394a4`. Anonymous archive download
returned HTTP 200; required source files and selected content were verified.
Operator-only AGENTS.md and BRANDING_BRIEF.md were excluded. Known credential
patterns were checked across 11,208 ancestry blobs with no matches; this was not
an exhaustive security audit.

The following publication follow-up changes the source-offer configuration,
generated legal HTML and publication documentation only. To reproduce the
application with its enabled offer from the linked commit, set repositoryUrl to
the company URL, releaseCommit to the hash above, and urlApproved/sourcePublished
to true, then run the included preparation script before building. No application
logic or styles change in this follow-up. Full build, runtime correspondence and
license inventory checks remain pending; publication is not release approval.

## Validation update — 2026-11-18

Ran the frozen dependency install and local Prisma client generation without
changing schemas or databases. Current and upstream frontend typechecks pass.
ESLint retains 615 baseline errors, with no new diagnostics after normalization.
Collected dependency manifests and original bundled notice evidence in
`docs/dependencies/`; release-specific review remains incomplete. Confirmed empty
upstream font placeholders and documented them. Fixed mobile wrapping of the
legal page source hash. Local responsive legal-page and compiled-theme fixture
checks pass; see `docs/VALIDATION_REPORT.md` for scope and build limitations.

Frontend build configuration follow-up: keep isomorphic-dompurify external on the
server so its JSDOM dependency can read package-relative assets. No changes to
shared sanitizer code or its allowed tags/attributes were made.

The corrected Webpack build completed compilation, TypeScript, page generation
and tracing, then exited with Next SecurityFatalError for the pinned version's
known vulnerability. No final passing build or security upgrade is claimed.

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

## Updated source offer — 2026-11-18

The Polotno-free source revision is `63c3f185d97bf211cfb923fbeee50acc335016d4`.
Its public archive was downloaded anonymously and checked for the removed editor,
updated package manifest, notices and build/validation records. The source offer
is generated from this revision with the approved company URL and both flags
true. This follow-up changes source-offer configuration/HTML and records only;
run the included generator with these values to reproduce it. No deployment
or resolution of the Next.js advisory is claimed.

## Next.js security patch — 2026-11-18

On branch security/next-16.4.6, updated next, its override and the matching
eslint-config-next pin from 16.4.2 to 16.4.6. Preserved unrelated lockfile
records and validated the scoped graph with a frozen install. Typecheck and
production Webpack build pass. Signed-out local browser checks pass at mobile
and desktop widths. Source lint retains baseline failures, with no new
diagnostic summaries. npm's target-version query returned no Next advisories.
See NEXT_SECURITY_PATCH.md for evidence and limits. Production remains unchanged;
authenticated staging and source/image correspondence are still unverified.
