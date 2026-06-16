---
name: "Sourcemap Broken"
description: "A plugin transformed a module but did not produce a valid source map to go with it, making Rollup unable to generate an accurate combined source map. Pass sourcemap: false to suppress the error, or fix the plugin to return a valid map from its transform hook."
references:
  - https://rollupjs.org/troubleshooting/#warning-sourcemap-is-likely-to-be-incorrect
---
