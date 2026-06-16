---
name: "Missing Suspense with CSR Bailout"
description: "A component using useSearchParams() was not wrapped in a Suspense boundary. In the App Router, useSearchParams() causes the component tree to bail out of server-side rendering and render on the client only. Without a Suspense boundary, this results in an error during build or a degraded user experience. Wrap the component (or its nearest parent that uses useSearchParams) in <Suspense fallback={...}>."
references:
  - https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  - https://nextjs.org/docs/app/api-reference/functions/use-search-params
---
