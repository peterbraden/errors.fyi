---
name: "Key Moved"
description: "In cluster mode, the key's hash slot is served by a different node. The response includes the slot number and the address of the responsible node. The client should redirect and retry."
references:
  - https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/#moved-redirection
---
