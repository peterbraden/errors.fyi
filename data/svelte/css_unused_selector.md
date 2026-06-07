---
name: Unused CSS Selector
description: "A selector inside a component's `<style>` block doesn't match any element in that component's markup, so Svelte's scoped-CSS compiler flags it as dead code. Common causes are typos, selectors meant for slotted/child-component markup (use `:global(...)`), or leftover styles after refactoring."
references:
  - https://svelte.dev/docs/svelte/compiler-warnings#css_unused_selector
---
