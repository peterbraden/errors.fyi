# errors.fyi

A community-maintained directory of error codes (HTTP, POSIX, and beyond),
statically generated from this repository. Anyone can open a pull request to
add new codes; CI rebuilds and deploys on merge to `main`.

## Decisions

- **Domain:** `errors.fyi` (registered). Candidates checked via `dig NS`;
  `errorcodes.dev`, `errorcode.dev`, `errordex.dev` were all taken.
- **Static site generator:** Astro — static output, good DX, no framework
  overhead for what is essentially a content site.
- **Hosting:** GitHub Pages, deployed via GitHub Actions.
- **Data format:** one JSON file per namespace under `data/` (e.g.
  `data/http.json`). Adding a new namespace requires only a new JSON file —
  no code changes. Schema documented in `data/README.md`.

## Structure

```
data/               # one JSON file per namespace
  http.json         # 63 HTTP status codes, 1xx–5xx, RFC-referenced
  README.md         # contributor schema and instructions
src/
  layouts/Base.astro
  lib/data.ts       # reads data/ at build time
  pages/
    index.astro               # namespace listing
    [namespace]/index.astro   # code list, grouped by hundreds
    [namespace]/[code].astro  # individual code page
.github/workflows/deploy.yml  # build + deploy on push to main
astro.config.mjs              # site: https://errors.fyi, output: static
```

## Tasks

- [x] Find a good name by querying available domain names. → `errors.fyi`
- [x] Create repo structure and seed with HTTP error codes.
- [x] Set up GitHub Actions CI/CD for automatic build and deploy to GH Pages.
- [ ] Enable GitHub Pages in repo settings (Settings → Pages → source:
      GitHub Actions). Must be done manually by the repo owner.

## Known / Next

- POSIX error codes (`errno`) would be a natural next namespace to add.
- No search yet — could be added client-side (Pagefind is a good fit for
  static sites) once the content grows.
- `npm audit` reports 3 vulnerabilities in the Astro dependency tree; none
  affect the static build output.
