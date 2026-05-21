---
name: "StackOverflowError"
description: "Thrown when the JVM call stack depth is exceeded, almost always due to infinite or excessively deep recursion. Methods annotated with @tailrec are compiled to loops and avoid this; ensure tail-call optimisation is applied for deeply recursive code."
references:
  - https://docs.oracle.com/en/java/se/17/docs/api/java.base/java/lang/StackOverflowError.html
---
