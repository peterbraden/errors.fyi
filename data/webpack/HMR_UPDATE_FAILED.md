---
name: "HMR Update Failed"
description: "webpack's Hot Module Replacement could not apply a patch to the running application. This happens when the updated module or one of its ancestors cannot be hot-replaced (no `module.hot.accept` handler bubbles the change to the app root). The dev server falls back to a full page reload. To avoid the fallback, add `module.hot.accept()` boundaries around the module."
references:
  - https://webpack.js.org/concepts/hot-module-replacement/
  - https://webpack.js.org/api/hot-module-replacement/
---
