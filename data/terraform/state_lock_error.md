---
name: "Error acquiring the state lock"
description: "Terraform could not obtain an exclusive lock on the state file, because another operation is already holding it. Wait for the other operation to complete, or manually remove a stale lock with terraform force-unlock if the previous process crashed."
references:
  - https://developer.hashicorp.com/terraform/language/state/locking
---
