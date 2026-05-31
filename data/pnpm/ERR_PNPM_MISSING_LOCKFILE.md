---
name: "Missing Lockfile"
description: "pnpm was run with `--frozen-lockfile` (the default in CI environments) but no pnpm-lock.yaml exists. Commit a lockfile generated locally by running `pnpm install` and pushing the resulting pnpm-lock.yaml."
references:
  - https://pnpm.io/cli/install#--frozen-lockfile
---
