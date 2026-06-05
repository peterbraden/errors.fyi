---
name: "Circular Dependency"
description: "A circular import chain was detected (e.g. A imports B imports A). Rollup can still bundle circular dependencies in many cases, but they may cause runtime issues — values can be undefined at the time of first access. Refactor to break the cycle or use dynamic imports."
references:
  - https://rollupjs.org/troubleshooting/#warning-circular-dependency
---
