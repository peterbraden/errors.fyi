---
name: "Too Many Filesystem Checks"
description: "The router performed too many filesystem lookups while trying to resolve the request path, usually caused by a very large number of rewrite rules or a deeply recursive routing configuration. Returned with HTTP 502; simplify the rewrites in vercel.json or the framework's routing config."
references:
  - https://vercel.com/docs/errors/TOO_MANY_FILESYSTEM_CHECKS
---
