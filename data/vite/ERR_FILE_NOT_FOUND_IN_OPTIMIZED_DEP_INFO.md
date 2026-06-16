---
name: "File Not Found in Optimized Dependency Info"
description: "Vite's optimizer metadata references a file that no longer exists on disk. This usually happens after deleting `node_modules` without clearing the Vite cache, or after a partial install. Run `vite --force` or delete the `node_modules/.vite` directory and restart the dev server."
references:
  - https://vitejs.dev/guide/dep-pre-bundling
---
