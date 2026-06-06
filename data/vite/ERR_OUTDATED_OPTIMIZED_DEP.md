---
name: "Outdated Optimized Dependency"
description: "A pre-bundled dependency changed after the optimizer finished, leaving the cached version stale. Vite detects this mid-request and triggers a full page reload to re-optimize. If the reload loop repeats, force-clear the cache with `vite --force` or delete `node_modules/.vite`."
references:
  - https://vitejs.dev/guide/dep-pre-bundling
  - https://vitejs.dev/guide/troubleshooting#hmr
---
