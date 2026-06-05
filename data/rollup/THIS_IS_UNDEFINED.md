---
name: "This Is Undefined"
description: "A module uses this at the top level, but in ES module context this is undefined. Rollup replaces it with undefined in the output. If the code is CommonJS being converted to ESM, add @rollup/plugin-commonjs or suppress the warning for intentional top-level this references."
references:
  - https://rollupjs.org/troubleshooting/#warning-this-has-been-rewritten-to-undefined
---
