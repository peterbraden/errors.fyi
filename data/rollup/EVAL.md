---
name: "Use of eval"
description: "The bundle contains a call to eval() or an indirect equivalent. eval() prevents Rollup from safely tree-shaking the module because it can reference any variable by name at runtime. Replace eval() with a safer alternative, or suppress this warning if the use is intentional."
references:
  - https://rollupjs.org/troubleshooting/#warning-eval
---
