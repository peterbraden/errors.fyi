---
name: "No HTML Link for Pages"
description: "A raw HTML <a> element was used to link to an internal page route instead of the next/link component. Using <a> for internal navigation triggers a full page reload, losing client-side state and skipping prefetching. Replace with the Link component from 'next/link'."
references:
  - https://nextjs.org/docs/messages/no-html-link-for-pages
  - https://nextjs.org/docs/app/api-reference/components/link
---
