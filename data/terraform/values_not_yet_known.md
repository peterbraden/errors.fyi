---
name: "Error: ... will be known only after apply"
description: "An attribute used in a context that requires a known value at plan time (such as count, for_each, or a provider configuration) depends on a resource attribute that is only computed after apply. Restructure the configuration to use a known value, or use a data source."
references:
  - https://developer.hashicorp.com/terraform/language/meta-arguments/count
  - https://developer.hashicorp.com/terraform/language/meta-arguments/for_each
---
