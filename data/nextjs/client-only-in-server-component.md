---
name: "Client-Only in Server Component"
description: "A module marked with the client-only package was imported inside a React Server Component. Modules that depend on browser APIs (DOM, window, localStorage) should only run on the client. Move the import into a component file that begins with the 'use client' directive, or wrap the usage in a Client Component."
references:
  - https://nextjs.org/docs/messages/client-only-in-server-component
  - https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
---
