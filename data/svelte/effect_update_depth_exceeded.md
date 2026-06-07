---
name: Effect Update Depth Exceeded
description: "Svelte detected an infinite update loop — an `$effect` (or reactive statement) keeps re-running because it both reads and writes the same reactive state. Equivalent to React's \"Maximum update depth exceeded\"; break the cycle by reading and writing different state, or guarding the write with a condition."
references:
  - https://svelte.dev/docs/svelte/runtime-errors#effect_update_depth_exceeded
---
