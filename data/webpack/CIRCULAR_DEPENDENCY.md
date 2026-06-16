---
name: "Circular Dependency"
description: "Two or more modules import each other in a cycle. webpack can still bundle circular dependencies but the evaluation order is undefined, which often results in a module being `undefined` when first accessed. Detected via the `circular-dependency-plugin`. Refactor the dependency cycle by extracting shared code into a third module."
references:
  - https://webpack.js.org/guides/dependency-management/
  - https://github.com/aackerman/circular-dependency-plugin
---
