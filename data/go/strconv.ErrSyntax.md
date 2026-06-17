---
name: "Invalid Syntax"
description: "Returned by strconv functions (Atoi, ParseInt, ParseFloat, etc.) when the input string is not a valid representation of the requested type. Unwrap the *strconv.NumError to inspect the problematic value."
references:
  - https://pkg.go.dev/strconv#ErrSyntax
---
