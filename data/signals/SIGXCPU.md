---
name: "CPU time limit exceeded"
numeric: 24
description: "Sent when a process exceeds its soft CPU time limit set via setrlimit(2). The process may catch this signal to save state before SIGKILL is delivered when the hard limit is reached."
references:
  - https://man7.org/linux/man-pages/man7/signal.7.html
---
