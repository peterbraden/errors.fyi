---
name: Keyed Each Block Has Duplicate Key
description: "A keyed `{#each list as item (key)}` block produced the same key for more than one item. Key expressions must be unique and stable across re-renders — derive a primitive value (e.g. `item.id`) rather than an object or array, which is never equal to itself between renders."
references:
  - https://svelte.dev/docs/svelte/compiler-errors#each_key_duplicate
---
