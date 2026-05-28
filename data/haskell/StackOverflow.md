---
name: "StackOverflow"
description: "An AsyncException thrown by the GHC runtime when the thread stack size exceeds its limit. Typically caused by infinite recursion or very deep call chains. Increase the limit with +RTS -K<size> or rewrite the algorithm using heap-allocated continuations."
references:
  - https://hackage.haskell.org/package/base/docs/Control-Exception.html#t:AsyncException
---
