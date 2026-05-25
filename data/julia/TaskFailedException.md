---
name: "Async Task Failed"
description: "A Task (coroutine) finished with an unhandled exception. When you fetch() or wait() on a failed task, Julia re-throws the task's exception wrapped in a TaskFailedException. Inspect the 'task' field's exception for the root cause."
references:
  - https://docs.julialang.org/en/v1/base/base/#Base.TaskFailedException
---
