---
name: "Too many parts"
numeric: 252
description: "A MergeTree table has accumulated more parts than the configured limit, usually due to an excessive INSERT rate that outpaces background merges. Slow down inserts or tune merge settings."
references:
  - https://clickhouse.com/docs/en/operations/error-codes
---
