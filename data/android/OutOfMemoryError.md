---
name: OutOfMemoryError
description: "Thrown by the Android Runtime when the heap is exhausted. The most common cause is retaining large Bitmap objects or off-screen Views. Use Glide or Coil for image loading (they handle sampling and caching), avoid static references to Context or View, and use LeakCanary to detect leaks."
references:
  - https://developer.android.com/topic/performance/memory
---
