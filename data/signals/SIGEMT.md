---
name: "Emulator Trap"
numeric: 7
description: "Sent when an emulator instruction or emulation trap occurs. Present on macOS and BSD systems (signal 7) but not defined on Linux. Historically used to signal emulated instructions on systems running code for a different architecture."
references:
  - https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/sigaction.2.html
  - https://man.freebsd.org/cgi/man.cgi?query=signal&sektion=7
---
