---
name: "VcsHashUnsupported"
description: "Raised in hash-checking mode when a requirement points to a VCS source URL (git+, svn+, hg+, bzr+). Version control checkouts cannot be hashed because their content can change. Pin to a fixed commit or use a release archive instead."
references:
  - https://pip.pypa.io/en/stable/topics/secure-installs/#hash-checking-mode
---
