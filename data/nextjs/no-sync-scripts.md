---
name: "No Sync Scripts"
description: "A synchronous (render-blocking) third-party <script> tag was used instead of the next/script component. Synchronous scripts block HTML parsing and delay page load. The Script component from 'next/script' provides strategy-based loading (beforeInteractive, afterInteractive, lazyOnload, worker) for optimal performance."
references:
  - https://nextjs.org/docs/messages/no-sync-scripts
  - https://nextjs.org/docs/app/api-reference/components/script
---
