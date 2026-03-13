# Data

Error codes are organised into namespaces. Each namespace is a directory
under `data/`, containing a `_index.md` for namespace metadata and one `.md`
file per code.

```
data/
  http/
    _index.md      ← namespace metadata
    404.md         ← one file per code
    ...
  posix/
    _index.md
    ENOENT.md
    ...
```

The filename (without `.md`) is the canonical code string and becomes the URL:
`data/http/404.md` → `errors.fyi/404`.

If two namespaces define the same code (e.g. `http/416.md` and
`someother/416.md`), both appear on the same page at `errors.fyi/416`.

## _index.md schema

```yaml
---
title: HTTP Status Codes
description: "One or two sentences describing the namespace."
references:
  - https://www.rfc-editor.org/rfc/rfc9110   # optional
---
```

## Code file schema

```yaml
---
name: Not Found
description: "The server cannot find the requested resource."
references:
  - https://www.rfc-editor.org/rfc/rfc9110#section-15.5.5  # optional
---
```

For symbolic codes that have a numeric equivalent (e.g. POSIX `ENOENT = 2`),
add a `numeric` field. This generates an alias page at `errors.fyi/2` that
links back to the canonical `errors.fyi/ENOENT`:

```yaml
---
name: No such file or directory
numeric: 2
description: "A component of the specified pathname does not exist."
references:
  - https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/errno.h.html
---
```

## Contributing

1. Fork the repository.
2. Add or edit a `.md` file in the appropriate `data/<namespace>/` directory.
   Create a new namespace directory (with a `_index.md`) if needed.
3. Ensure your JSON frontmatter is valid YAML and the file is well-formed.
4. Open a pull request against `main`; CI builds and deploys on merge.
