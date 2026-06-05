---
name: "Missing Global Name"
description: "A module is marked as external but no global variable name was provided for it in the output.globals option. Rollup cannot generate valid UMD or IIFE output without knowing what global to reference. Add an entry to output.globals mapping the module id to its global name."
references:
  - https://rollupjs.org/troubleshooting/#warning-missing-global-name
  - https://rollupjs.org/configuration-options/#output-globals
---
