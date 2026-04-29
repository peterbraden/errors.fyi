---
name: "Bad system call"
numeric: 31
description: "Raised when a process makes a system call with an invalid argument or attempts a syscall that is not permitted (e.g. blocked by a seccomp filter). Used by sandboxing mechanisms."
references:
  - https://man7.org/linux/man-pages/man7/signal.7.html
---
