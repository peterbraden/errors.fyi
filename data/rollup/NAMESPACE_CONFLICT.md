---
name: "Namespace Conflict"
description: "Two modules export the same name and both are re-exported through a namespace wildcard (export * from '...'). Only one value can win. Resolve the conflict by explicitly re-exporting the desired binding or renaming one of them."
references:
  - https://rollupjs.org/troubleshooting/
---
