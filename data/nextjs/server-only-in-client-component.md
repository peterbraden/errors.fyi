---
name: "Server-Only in Client Component"
description: "A module marked with the server-only package was imported inside a Client Component. Modules marked server-only contain logic that must not be bundled for the browser, such as database connections or secret environment variables. Move the import to a Server Component, a server action, or a Route Handler."
references:
  - https://nextjs.org/docs/messages/server-only-in-client-component
  - https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
---
