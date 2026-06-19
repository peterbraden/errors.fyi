---
name: "Misconfiguration"
description: "Redis is configured to save RDB snapshots but is currently unable to persist to disk, so write commands are being rejected to avoid data loss. Check disk space and the last BGSAVE error, then run CONFIG SET stop-writes-on-bgsave-error no to override if acceptable."
references:
  - https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/
---
