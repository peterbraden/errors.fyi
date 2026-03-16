---
name: "File Does Not Exist"
description: "File or directory does not exist. Wraps the underlying OS error (ENOENT on Unix). Use errors.Is(err, os.ErrNotExist) rather than comparing directly."
references:
  - https://pkg.go.dev/os#ErrNotExist
---
