---
name: "Value Out Of Range"
description: "Returned by strconv parsing functions when the input value is syntactically valid but falls outside the range of the target type (e.g. parsing '300' into a uint8). Use a wider type or validate the value before converting."
references:
  - https://pkg.go.dev/strconv#ErrRange
---
