---
name: "Blocked Dependency"
description: "A dependency was blocked from loading by Vite's dev server, typically because it matched a pattern in the `server.fs.deny` config or falls outside the allowed file-system boundary set by `server.fs.allow`. Adjust `server.fs.allow` to include the path, or move the file inside the project root."
references:
  - https://vitejs.dev/config/server-options#server-fs-allow
  - https://vitejs.dev/config/server-options#server-fs-deny
---
