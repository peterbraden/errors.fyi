---
name: "Invalid depends_on reference"
description: "The depends_on meta-argument contains a reference that is not a resource or module address, or it attempts to reference an output or attribute rather than a whole resource. Use only bare resource or module references (e.g. aws_instance.web, not aws_instance.web.id)."
references:
  - https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on
---
