---
name: "Status request"
numeric: 29
description: "macOS/BSD-specific signal sent to a process when the user presses CTRL+T in the terminal. Programs typically handle it to print a brief status summary to stderr. Signal 29 on macOS/BSD; not defined on Linux (where signal 29 is SIGIO/SIGPOLL)."
references:
  - https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/signal.2.html
  - https://man.freebsd.org/cgi/man.cgi?signal(3)
---
