---
name: "Chunk Load Error"
description: "A lazily-loaded code-split chunk failed to load in the browser at runtime. Caused by a network error, a stale CDN cache serving an old chunk hash, or the chunk file being missing from the server. The message reads 'Loading chunk N failed'. Hard-refresh the page; if the error persists in production, ensure the deployment atomically replaces all chunk files."
references:
  - https://webpack.js.org/guides/code-splitting/
  - https://webpack.js.org/configuration/output/#outputpublicpath
---
