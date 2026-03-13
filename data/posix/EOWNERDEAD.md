---
name: "Previous owner died"
description: "A robust mutex was abandoned by its previous owner. The mutex is now held by the caller, but the protected state may be inconsistent and must be checked. Numeric value is platform-specific: 130 on Linux, 105 on macOS."
references:
  - https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/errno.h.html
---
