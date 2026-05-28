---
name: "BlockedIndefinitelyOnMVar"
description: "Thrown when a thread is blocked on an MVar operation and the runtime determines that no other thread holds a reference to that MVar, so the block can never be resolved. Indicates a localised deadlock on that specific MVar."
references:
  - https://hackage.haskell.org/package/base/docs/Control-Exception.html#t:BlockedIndefinitelyOnMVar
---
