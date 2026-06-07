---
name: Unsafe State Mutation
description: "Reactive state was mutated somewhere it isn't allowed — most commonly inside a `$derived(...)` expression or directly in a template. Derived values must be pure; if the value shouldn't be reactive, declare it without `$state`, or move the mutation into an `$effect`."
references:
  - https://svelte.dev/docs/svelte/runtime-errors#state_unsafe_mutation
---
