# Third-party notices

Q and A Social Manager is a branded derivative of Postiz. Q and A App's
branding and modifications do not imply authorship of the original Postiz
application or endorsement by its authors.

## Postiz

- Upstream project: https://github.com/gitroomhq/postiz-app
- Source base: tag `v2.25.3`, commit `a5affe62c74e39c1e7ac960d50d8418b807d532c`.
- Copyright in upstream contributions remains with their respective authors.
- Repository license: GNU Affero General Public License, version 3 (`LICENSE`).
- Q and A modifications to the covered application are provided under the same
  AGPL-3.0 terms. Existing copyright, license and warranty notices are retained.
- There is no warranty, to the extent permitted by applicable law; see sections
  15 and 16 of `LICENSE` for the full terms.

The frontend package's `ISC` manifest field conflicts with the repository-wide
AGPL declaration. It is not treated as permission to relicense this derivative.
This record does not alter either upstream file.

## Plus Jakarta Sans

Copyright 2020 The Plus Jakarta Sans Project Authors
(https://github.com/tokotype/PlusJakartaSans).

The bundled font is licensed under the SIL Open Font License, version 1.1.
Preserve `apps/frontend/src/fonts/plus-jakarta-sans/OFL.txt` with the fonts.
An identical public copy is provided at `/font-license.txt`.

## Other dependencies and assets

Dependency packages retain their respective licenses. Provider names, logos,
connector identities and upstream tutorial materials identify their actual
owners and services. They are not Q and A-created assets.

The Q and A icon was supplied by the operator for this derivative. This notice
does not grant trademark rights or independently license the supplied artwork.

Installed dependency evidence is recorded in `docs/dependencies/`: an inventory
of discovered package/version manifests and preserved bundled license texts.
This includes tooling and package examples, not just browser runtime code, and
is not a declaration that all dependency obligations have been satisfied.

The tracked Charter, SFNS and Chirp font placeholders are zero bytes. No usable
font data or application references were found in the inspected provider code;
the Charter stylesheet refers to absent webfonts. They must not be replaced
with proprietary font data without establishing permission.

Release review must verify commercial Polotno entitlement, Meta Platform License
terms, FSL build-tool terms, LGPL/MPL obligations and incomplete package metadata.
See `docs/dependencies/README.md` and `docs/VALIDATION_REPORT.md`.

## Corresponding Source — release requirement

The upstream repository is not the source of the Q and A-modified version.
Before serving a modified release, provide its complete Corresponding Source
at no charge through the prominent source offer on `/legal.html`. Record the
release revision and verify that the download matches the deployed version.
Include the source and scripts needed to build, install and run that version,
plus applicable dependency source and notices. Do not include credentials,
tokens, private configuration or user data.

The operator approved https://github.com/toluw/qanda-social-manager as the
company source repository. Revision `0dd05df2ad34499f48bde7dfb819a52f374394a4` was published
and its archive downloaded without authentication on 2026-11-17. Required source
files were checked against the local revision. No deployment is claimed.

The static Source Code section is generated from
`apps/frontend/source-code-config.json` with
`python3 apps/frontend/scripts/prepare-source-page.py`. Its approval and publication
flags record verified repository access, not a completed build or exhaustive
compliance audit. See `docs/BUILDING.md` for release inputs and remaining checks.
The Charter font provenance and full dependency notice review remain pending.

Operator confirmation (2026-11-18): the organization does not have a commercial
Polotno license covering this installation. Commercial release using that editor
remains blocked until appropriate entitlement is obtained or an approved
replacement is implemented and verified. No editor was disabled or replaced
during this validation.

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
