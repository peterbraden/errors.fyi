---
name: TransactionTooLargeException
description: "Thrown when an IPC transaction payload exceeds Android's Binder buffer limit (roughly 1 MB per process). Common causes are large Bitmaps or Parcelables in Intent extras or Fragment arguments. Avoid passing large objects via Intents; use a shared ViewModel, a file, or a database instead."
references:
  - https://developer.android.com/reference/android/os/TransactionTooLargeException
---
