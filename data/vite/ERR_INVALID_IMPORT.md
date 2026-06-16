---
name: "Invalid Import"
description: "Vite detected an import that violates ESM rules or crosses a boundary that Vite enforces. Common triggers include importing a server-only module into client code, using `require()` in an ESM context, or importing a package that only provides a CommonJS build without an ESM wrapper. Use dynamic `import()` or configure `ssr.noExternal` as appropriate."
references:
  - https://vitejs.dev/guide/ssr#ssr-externals
  - https://vitejs.dev/guide/troubleshooting
---
