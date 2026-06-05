---
name: "Missing Node Builtins"
description: "The bundle imports Node.js built-in modules (such as fs, path, or crypto) but is targeting a browser environment. Mark these imports as external or provide browser-compatible polyfills via the plugins option."
references:
  - https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
---
