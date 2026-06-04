---
name: "Cannot Override Metadata"
description: "A child route segment attempted to override a metadata field that can only be set in the root layout, such as the viewport or the icons configuration. Some metadata fields are inherited and cannot be overridden at the segment level. Move the configuration to the root layout, or use a layout at the appropriate level in the route hierarchy."
references:
  - https://nextjs.org/docs/messages/cannot-override-metadata
  - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
---
