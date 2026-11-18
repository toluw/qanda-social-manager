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
