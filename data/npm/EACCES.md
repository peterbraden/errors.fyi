---
name: "Permission Denied"
description: "npm lacks filesystem permission to read or write a file. Commonly caused by installing packages globally with `sudo` previously, leaving files owned by root. Fix by changing the global prefix to a user-writable directory rather than re-running with sudo."
references:
  - https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
---
