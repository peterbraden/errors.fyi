---
name: Derived References Self
description: "A `$derived(...)` expression reads the very value it's assigned to, creating a circular dependency. Derived values must be computed purely from other state — restructure the logic so the derivation doesn't depend on its own previous result."
references:
  - https://svelte.dev/docs/svelte/runtime-errors#derived_references_self
---
