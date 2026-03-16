# errors.fyi

A community-maintained directory of error codes (HTTP, POSIX, and beyond),
statically generated from this repository. Anyone can open a pull request to
add new codes; CI rebuilds and deploys on merge to `master`.

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
- **JSON export:** the build emits `dist/data/codes.json` — a static snapshot
  of all codes and namespace metadata, served from GitHub Pages. This is the
  single source of truth for both the site and the CLI.
- **CLI:** `cli/` is an npm package (`errors.fyi`, binary `errorfyi`) that
  fetches the JSON export at runtime. No bundled data snapshot; always reflects
  the latest deployment.

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
    data/
      codes.json.ts   ← static JSON export of all codes
cli/
  package.json        ← npm package: errors.fyi, binary: errorfyi
  bin/errorfyi.js     ← CLI: fetch, filter, pretty-print
.github/workflows/
  deploy.yml          ← build + deploy to GH Pages on push to master
  publish-cli.yml     ← publish cli/ to npm on changes to cli/
astro.config.mjs      ← site: https://errors.fyi, output: static
```

## Tasks

- [x] Find a good name by querying available domain names. → `errors.fyi`
- [x] Create repo structure and seed with HTTP error codes.
- [x] Set up GitHub Actions CI/CD for automatic build and deploy to GH Pages.
- [x] Migrate data format from JSON to Markdown + frontmatter.
- [x] Reroute URLs to `errors.fyi/<code>`; implement numeric alias pages.
- [x] Fix numeric alias cross-reference: direct numeric pages now surface
      symbolic codes whose `numeric` field matches (e.g. `/2/` lists ENOENT).
- [x] Fix Astro style scoping: layout `<style>` changed to `<style is:global>`
      so link colour applies to `<slot>` content from page components.
- [x] Add namespaces: POSIX, curl, git, rsync, gRPC, HTTP/2, DNS, PostgreSQL,
      MySQL, Node.js, systemd, OpenSSL, Windows errno, Python, SMTP, Docker,
      AWS, SQLite, Kubernetes, Ruby, Java, MongoDB.
- [x] Static JSON export: `errors.fyi/data/codes.json`.
- [x] CLI tool: `errorfyi` (npm package `errors.fyi`).
- [x] CI workflow to publish CLI to npm on changes to `cli/`.
- [x] Enable GitHub Pages in repo settings (Settings → Pages → source:
      GitHub Actions).
- [x] CLI publish via npm trusted publishing (OIDC) — no token required.
- Improve homepage, Prominent search, cli instructions move to footer. We don't
  need every error code listed, just some highlights.
- Make a canonical error page, ie `/http/404` and link from the 404 page.
- Investigate cookieless analytics - we want basic info like page views, but no
  privacy impact.

## Known / Next

- No search yet — Pagefind is a good fit once content grows.
- `src/pages/404.astro` is the GH Pages 404 handler. It uses
  `window.location.pathname` to show either the HTTP 404 entry (if the
  URL is exactly `/404`) or an unknown-code prompt with contribution
  instructions. The `404` code is excluded from `[code].astro` to avoid
  a static/dynamic route conflict.
- `npm audit` reports 3 vulnerabilities in the Astro dependency tree; none
  affect the static build output.

## Future

- **Search:** Pagefind integration once content stabilises.
- **More namespaces:** PHP exceptions, Go standard library sentinels, Redis
  RESP errors, OAuth/OIDC error codes, nginx/Apache status codes.
- **Pipe-aware namespace detection:** when `errorfyi` receives piped input
  (stdin is not a TTY), parse the text for known error patterns to infer both
  the code and the namespace automatically. For example:
  - `psql 2>&1 | errorfyi` → detect `SQLSTATE: 42601`, infer namespace `postgresql`
  - `node script.js 2>&1 | errorfyi` → detect `ERR_MODULE_NOT_FOUND`, infer `nodejs`
  - `python3 script.py 2>&1 | errorfyi` → detect `ValueError:`, infer `python`
  Deferred: heuristic matching is useful but not essential; the `-n` flag is a
  sufficient workaround for now.
- **Per-namespace browse pages:** listing all codes within a namespace.
- **Standalone binary:** pkg or similar for users who prefer not to install Node.
