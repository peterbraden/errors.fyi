---
name: "Read-Only File System"
description: "npm tried to write to a filesystem that is mounted read-only, commonly inside a Docker container, a read-only Kubernetes root filesystem, or a virtualized filesystem that doesn't support symlinks. Mount a writable volume for the npm cache and project directory, or run the install step before switching the filesystem to read-only."
references:
  - https://docs.npmjs.com/common-errors
---
