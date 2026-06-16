---
name: "No Page Custom Font"
description: "A custom font was loaded via a <link> tag inside an individual page component instead of in the _document.js file. Fonts added per-page are re-requested on every client-side navigation. Move global font <link> tags to the <Head> inside _document.js so they are loaded once for the entire application, or use the next/font module for automatic self-hosting and optimization."
references:
  - https://nextjs.org/docs/messages/no-page-custom-font
  - https://nextjs.org/docs/app/api-reference/components/font
---
