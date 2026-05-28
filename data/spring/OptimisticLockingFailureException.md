---
name: OptimisticLockingFailureException
description: "Thrown when a JPA @Version field detects a concurrent modification — another transaction updated the entity between the current transaction's read and write. Retry the operation, merge the conflicting changes, or inform the user of the conflict."
references:
  - https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/orm/ObjectOptimisticLockingFailureException.html
---
