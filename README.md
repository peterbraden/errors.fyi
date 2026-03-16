# errors.fyi

A community-maintained directory of error codes, published at [errors.fyi](https://errors.fyi).

Each error code has a canonical page — `errors.fyi/404`, `errors.fyi/ENOENT` — that consolidates
every namespace defining that code in one place. The site is statically generated from this
repository; merging a pull request to `main` triggers an automatic rebuild and deploy.

## Contributing

Adding or correcting an error code requires only a single Markdown file. No code changes are needed.

**Adding a code to an existing namespace** (e.g. HTTP):

Create `data/http/<code>.md` with the following frontmatter:

```yaml
---
name: Not Found
description: "The server cannot find the requested resource."
references:
  - https://www.rfc-editor.org/rfc/rfc9110#section-15.5.5
---
```

The filename (without `.md`) becomes the code and its URL. Keep descriptions to one or two plain
prose sentences.

**Adding a new namespace:**

Create a directory under `data/` and add a `_index.md` for namespace metadata:

```yaml
---
title: POSIX Error Codes
description: "Error codes defined by the POSIX standard, accessible via errno."
references:
  - https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/errno.h.html
---
```

Then add individual code files as above. See `data/README.md` for the full schema, including the
`numeric` field for symbolic codes such as `ENOENT`.

## CLI

All codes are available as a machine-readable JSON export at
`https://errors.fyi/data/codes.json`. The `errorfyi` CLI fetches this at
runtime — no local data snapshot, always reflects the latest deployment.

```
# Install
npm install -g errors-fyi

# Look up a code across all namespaces
errorfyi ENOENT
errorfyi 11000
errorfyi 404

# Filter to one namespace
errorfyi 23505 -n postgresql

# Raw JSON output
errorfyi ECONNREFUSED --json
```

Requires Node 18 or later.

## Running locally

```
# Install dependencies
npm install

# Start the development server
npm run dev

# Build the static site (also emits dist/data/codes.json)
npm run build
```

## Structure

```
data/
  <namespace>/
    _index.md           namespace metadata
    <code>.md           one file per code
src/
  lib/data.ts           reads data/ at build time
  pages/
    index.astro         homepage
    [code].astro        per-code page
    data/codes.json.ts  static JSON export
cli/
  package.json          npm package (errors.fyi, binary errorfyi)
  bin/errorfyi.js       CLI entry point
.github/
  workflows/
    deploy.yml          builds and deploys to GitHub Pages on push to master
    publish-cli.yml     publishes cli/ to npm on version tags (v*)
```

## Licence

Site code is released under the [MIT Licence](LICENSE). Data contributed to
this repository is released under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

## Note about this project.

This was created entirely as a vibe coded experiment to test the capabilities of
LLM's by @peterbraden. I wanted to see if I could deploy a website without
writing a single line of code (this comment is all I edited) before my train
arrived. I hope it's useful.

