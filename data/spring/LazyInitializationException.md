---
name: LazyInitializationException
description: "Thrown by Hibernate (via Spring Data JPA) when a lazily-loaded association is accessed outside an active Hibernate Session. Fix by annotating the calling method with @Transactional, using JOIN FETCH in the query, switching to eager loading, or using a DTO projection."
references:
  - https://docs.jboss.org/hibernate/orm/current/javadocs/org/hibernate/LazyInitializationException.html
---
