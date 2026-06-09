---
name: "Attribute Not Defined in Union Member"
description: "An attribute is accessed on a union type but one or more union members do not define it. Narrow the type with isinstance() or other type guards before accessing the attribute."
references:
  - https://mypy.readthedocs.io/en/stable/error_codes.html#check-that-attribute-exists-in-each-union-item-union-attr
---
