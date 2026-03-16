---
name: "Busy snapshot conflict"
description: "A reader in WAL mode is holding a snapshot that the writer needs to overwrite. The reader must advance to a newer snapshot before the writer can proceed."
numeric: 517
references:
  - https://www.sqlite.org/rescode.html
---
