---
name: "BlockedIndefinitelyOnSTM"
description: "Thrown when a thread is blocked inside an atomically block and the runtime determines that no other thread can commit a transaction that would unblock it. Indicates a deadlock within the STM subsystem."
references:
  - https://hackage.haskell.org/package/base/docs/Control-Exception.html#t:BlockedIndefinitelyOnSTM
---
