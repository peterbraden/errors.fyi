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
- **Data format:** one Markdown file per code, with YAML frontmatter for
  structured metadata. Files live at `data/<namespace>/<code>.md`. Adding a
  new namespace requires only a new directory and files — no code changes.
  Schema documented in `data/README.md`.
- **URL scheme:** `errors.fyi/<code>` is the canonical URL. The namespace is
  context shown on the page, not part of the path. If two namespaces share a
  code value, both appear on the same page. Symbolic codes with a `numeric`
  frontmatter field generate an alias page (e.g. `errors.fyi/2` → ENOENT).
- **No per-namespace browse pages** for now — the homepage lists all codes
  grouped by namespace.

## Structure

```
data/
  <namespace>/
    _index.md         ← namespace metadata (title, description, references)
    <code>.md         ← one file per code; filename is the canonical code string
  README.md           ← contributor schema and instructions
src/
  layouts/Base.astro
  lib/data.ts         ← reads data/ at build time via gray-matter
  pages/
    index.astro       ← homepage: all codes grouped by namespace
    [code].astro      ← per-code page, aggregates across namespaces;
                         also renders numeric alias pages
.github/workflows/deploy.yml  ← build + deploy on push to main
astro.config.mjs              ← site: https://errors.fyi, output: static
```

## Tasks

- [x] Find a good name by querying available domain names. → `errors.fyi`
- [x] Create repo structure and seed with HTTP error codes.
- [x] Set up GitHub Actions CI/CD for automatic build and deploy to GH Pages.
- [x] Migrate data format from JSON to Markdown + frontmatter.
- [x] Reroute URLs to `errors.fyi/<code>`; implement numeric alias pages.
- [ ] Enable GitHub Pages in repo settings (Settings → Pages → source:
      GitHub Actions). Must be done manually by the repo owner.

## Known / Next

- POSIX error codes added (77 codes). Numeric values are `numeric` field where
  consistent across Linux/macOS; platform-variable codes note both values in
  the description instead.
- No search yet — Pagefind is a good fit once content grows.
- `src/pages/404.astro` is the GH Pages 404 handler. It uses
  `window.location.pathname` to show either the HTTP 404 entry (if the
  URL is exactly `/404`) or an unknown-code prompt with contribution
  instructions. The "404" code is excluded from `[code].astro` to avoid
  a static/dynamic route conflict.
- `npm audit` reports 3 vulnerabilities in the Astro dependency tree; none
  affect the static build output.

## Future: CLI (`errors.fyi explain 404`)

Goal: a CLI that mirrors the website, installable via npm or a standalone binary.

```
$ errors.fyi explain 404
404 — Not Found (HTTP)
The server cannot find the requested resource. The URL may be wrong,
or the resource may not exist.
RFC 9110 §15.5.5
```

Key architectural consideration: the CLI must not bundle a data snapshot that
goes stale. The cleanest approach is to have the Astro build emit a static JSON
index (e.g. `public/data/codes.json`) alongside the HTML, which the CLI fetches
at runtime. This means:

- No separate API infrastructure — data is served from the same GitHub Pages
  deployment and is always current.
- The CLI is thin: fetch, filter, format. No local data management.
- The build pipeline becomes the single source of truth for both the site and
  the CLI.

The invocation `errors.fyi` (with a dot) is unusual as a shell command but is
valid. Worth verifying npm package name availability and checking whether a
simpler alias (e.g. `errs`) is preferable for ergonomics.
