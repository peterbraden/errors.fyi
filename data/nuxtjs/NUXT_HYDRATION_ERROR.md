---
name: "Hydration Error"
description: "The HTML rendered on the server does not match what Vue produced on the client during hydration. Common causes include accessing browser-only globals (window, document) outside of onMounted, using Date.now() or Math.random() without a seed, or conditional rendering based on cookies that differ between server and client."
references:
  - https://nuxt.com/docs/guide/concepts/rendering#universal-rendering
  - https://vuejs.org/guide/scaling-up/ssr#hydration-mismatch
---
