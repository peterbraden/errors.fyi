---
name: "Interserver scheme doesn't match"
numeric: 314
description: "A replication request was made over a scheme (HTTP vs HTTPS) that does not match the receiving server's interserver configuration. Align the `interserver_http_host` settings across replicas."
references:
  - https://clickhouse.com/docs/en/operations/error-codes
---
