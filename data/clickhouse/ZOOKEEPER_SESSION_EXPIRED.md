---
name: "ZooKeeper session expired"
numeric: 225
description: "The ZooKeeper (or ClickHouse Keeper) session expired, causing replicated operations to fail. The replica will attempt to re-establish the session; ongoing operations may need to be retried."
references:
  - https://clickhouse.com/docs/en/operations/error-codes
---
