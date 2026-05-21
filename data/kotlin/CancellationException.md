---
name: "CancellationException"
description: "Thrown when a coroutine is cancelled. This exception is treated specially by the coroutines library: it does not propagate to parent coroutines and is silently swallowed by most coroutine builders. Catching it without rethrowing will suppress cancellation."
references:
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-cancellation-exception/
  - https://kotlinlang.org/docs/cancellation-and-timeouts.html
---
