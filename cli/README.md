# errors-fyi

Look up error codes from the command line. Data is fetched live from
[errors.fyi](https://errors.fyi) — a community-maintained directory covering
HTTP, POSIX, PostgreSQL, MySQL, Node.js, Python, AWS, Kubernetes, and more.

## Installation

```
npm install -g errors-fyi
```

Requires Node 18 or later.

## Usage

```
errorfyi <code> [options]
```

```
# Look up a code across all namespaces
errorfyi ENOENT
errorfyi 404
errorfyi 11000

# Filter to one namespace
errorfyi 23505 -n postgresql
errorfyi 1064 -n mysql

# Output raw JSON
errorfyi ECONNREFUSED --json
```

Symbolic codes with a numeric equivalent are cross-referenced automatically —
looking up `2` will also return `ENOENT`, `EACCES`, and any other symbolic code
mapped to that number.

## Options

| Flag | Description |
|---|---|
| `-n`, `--namespace <ns>` | Filter results to one namespace |
| `-j`, `--json` | Output raw JSON instead of formatted text |
| `-h`, `--help` | Show usage |

## Namespaces

`aws` `curl` `dns` `docker` `git` `grpc` `http` `http2` `java` `kubernetes`
`mongodb` `mysql` `nodejs` `openssl` `posix` `postgresql` `python` `rsync`
`ruby` `shell` `smtp` `sqlite` `systemd` `windows` `windows-errno`

## Licence

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — data and code are in the public domain.
