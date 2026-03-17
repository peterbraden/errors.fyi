---
name: "Table size exceeds max drop size limit"
numeric: 339
description: "A DROP TABLE was rejected because the table is larger than the `max_table_size_to_drop` limit. Set the limit to 0 or create a flag file to bypass this safety check."
references:
  - https://clickhouse.com/docs/en/operations/error-codes
---
