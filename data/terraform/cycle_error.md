---
name: "Cycle error"
description: "Terraform detected a circular dependency in the configuration — a chain of references that eventually leads back to the starting resource. Break the cycle by restructuring dependencies or using the depends_on meta-argument carefully to avoid circular chains."
references:
  - https://developer.hashicorp.com/terraform/language/resources/behavior#resource-dependencies
---
