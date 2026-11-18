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

This is not a complete dependency license inventory. Before distribution,
collect applicable notices from the exact installed dependency versions and
resolve the provenance/license of the bundled Charter font files in
`apps/frontend/src/components/new-launch/providers/medium/fonts/`, which do not
have an adjacent license file in this checkout. Do not invent or remove notices.

## Corresponding Source — release requirement

The upstream repository is not the source of the Q and A-modified version.
Before serving a modified release, provide its complete Corresponding Source
at no charge through the prominent source offer on `/legal.html`. Record the
release revision and verify that the download matches the deployed version.
Include the source and scripts needed to build, install and run that version,
plus applicable dependency source and notices. Do not include credentials,
tokens, private configuration or user data.

The operator approved https://github.com/toluw/qanda-social-manager as the
company source repository. Publication has not been confirmed: the first push
was denied because the locally authenticated GitHub account lacks write access.
`apps/frontend/source-code-config.json` records the approved URL, an empty
`releaseCommit`, `urlApproved: true` and `sourcePublished: false`. There is no
working modified-source download offer yet.

After explicit URL approval and verified publication, record the exact release
commit and regenerate the static Source Code section with
`python3 apps/frontend/scripts/prepare-source-page.py`. The script does not
publish anything or verify remote availability. See `docs/BUILDING.md` for
preparation and verification instructions. The source-access requirement remains
incomplete until the actual modified source is publicly available and the
application offers working access to it. No deployment is authorized by setting
these fields.
