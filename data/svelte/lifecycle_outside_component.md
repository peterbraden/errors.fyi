---
name: Lifecycle Function Called Outside Component
description: "A lifecycle function such as `onMount`, `onDestroy`, `beforeUpdate`, or `getContext` was called outside of a component's initialisation — for example inside an event handler, `setTimeout`, or after an `await`. These functions must be called synchronously while the component is being instantiated."
references:
  - https://svelte.dev/docs/svelte/runtime-errors#lifecycle_outside_component
---
