---
name: "Persisted Query Not Found"
description: "The client sent an Automated Persisted Query (APQ) request containing only a query hash, but the server's APQ cache does not contain a document registered under that hash. The client should retry with the full query document."
references:
  - https://www.apollographql.com/docs/apollo-server/performance/apq/
  - https://www.apollographql.com/docs/apollo-server/data/errors/
---
