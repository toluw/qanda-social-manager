# Next.js security patch — 2026-11-18

Branch: security/next-16.4.6. Prepared from the published Polotno-free branding
branch. No production deployment or database/OAuth/environment changes.

## Scope

Pin next and eslint-config-next to 16.4.6 and update the pnpm next override.
The 16.4.6 release stays within the existing minor line. The November advisories
were patched in 16.4.5; 16.4.6 includes subsequent fixes.

https://github.com/vercel/next.js/releases/tag/v16.4.6

The initial pnpm resolver introduced unrelated changes. The final candidate
retains the original graph with updated Next.js-family entries and their needed
ESLint/dependency closure. Frozen install validates the resulting graph. No
unrelated dependency version upgrade is intended.

## Advisory evidence

The npm bulk endpoint was queried with next versions 16.4.2 and 16.4.6. It
returned these affected ranges, neither of which includes the target:

- Next.js: Information disclosure across root params when a 'use cache' function is called through unstable_cache() — >=16.3.0 <=16.4.4
  https://github.com/advisories/GHSA-mfr8-8qww-v76h
- Next.js: Cache leak across root param values in nested 'use cache' functions via delayed inner stream metadata — >=16.2.0 <=16.4.4
  https://github.com/advisories/GHSA-vc7v-qv4w-wrv8

This package/version query does not certify every application dependency or
prove the production image is safe. Production's framework version remains
unverified. No security warning is being suppressed through configuration.

## Validation

- Frozen install passed with lifecycle scripts disabled.
- Installed next and eslint-config-next versions confirmed as 16.4.6.
- Structural lockfile comparison preserved 7,477 unrelated package/snapshot
  records; importer changes are limited to Next version/peer references.
- Typecheck passed using the existing generated Prisma client.
- A separate npm bulk query for next@16.4.6 returned no advisories.
- Source lint: 606 errors and 1,869 warnings; no new diagnostic summaries
  compared with the earlier source baseline. Lint does not pass overall.
- Production build passed (exit 0): Next 16.4.6, Webpack, Node heap 6 GB.
  The previous SecurityFatalError did not recur. Existing Sentry instrumentation
  warning remains; no security-warning bypass was configured.
- Built frontend started locally with its backend pointed at a closed local
  port. Headless Chrome checks passed for /auth/login, /auth and /legal.html at
  390px and 1440px: HTTP 200, correct branding/titles, no broken images, no
  horizontal overflow and no browser page errors.

## Limits and next steps

Authenticated calendar, upload, integration and publishing behavior still needs
isolated staging services. This patch does not establish compatibility with the
unverified production image or constitute a full dependency security audit.
The source offer remains on the previously published application revision until
this patch is published and verified. Dependency license evidence in
`docs/dependencies/` predates this patch and remains historical evidence.
No production deployment or main-branch merge was performed.

Earlier results in VALIDATION_REPORT.md describe the pre-patch revision.
Dependency license evidence in docs/dependencies predates this patch; it is
historical evidence, not a current exhaustive runtime inventory.
