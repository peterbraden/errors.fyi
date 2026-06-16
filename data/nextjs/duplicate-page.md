---
name: "Duplicate Page"
description: "Two or more page files resolve to the same route. This typically happens when both a directory index file and a file with the same name exist at the same level, for example pages/about.js and pages/about/index.js. Next.js cannot determine which should take precedence, so it throws this error at startup. Remove or rename one of the conflicting files."
references:
  - https://nextjs.org/docs/messages/duplicate-page
---
