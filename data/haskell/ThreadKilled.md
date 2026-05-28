---
name: "ThreadKilled"
description: "An AsyncException delivered to a thread when killThread or throwTo is called on it. Threads should handle ThreadKilled to perform cleanup; it can be temporarily masked with mask but should eventually be re-raised."
references:
  - https://hackage.haskell.org/package/base/docs/Control-Concurrent.html#v:killThread
---
