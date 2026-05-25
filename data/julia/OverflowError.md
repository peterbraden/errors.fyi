---
name: "Arithmetic Overflow"
description: "An arithmetic operation produced a result that is outside the representable range of the integer type. Use a wider integer type (Int128, BigInt) or check for overflow before the operation with Base.checked_add and friends."
references:
  - https://docs.julialang.org/en/v1/base/base/#Core.OverflowError
---
