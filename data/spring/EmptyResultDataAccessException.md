---
name: EmptyResultDataAccessException
description: "Thrown by JdbcTemplate and Spring Data repositories when a query expected to return a single result returns no rows. Prefer Optional return types or findById() over getById()/getOne() to handle the absent-result case without an exception."
references:
  - https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/dao/EmptyResultDataAccessException.html
---
