---
name: BadTokenException
description: "Thrown by WindowManager.addView() when the window token is invalid or the associated Activity has already been destroyed. Typically occurs when showing a dialog or popup after the Activity's onDestroy(). Guard with isFinishing() || isDestroyed() before showing windows."
references:
  - https://developer.android.com/reference/android/view/WindowManager.BadTokenException
---
