---
name: "Write Failure"
numeric: 4100
description: "A write request failed because one or more replicas returned an error rather than a timeout. The error body includes the consistency level, required acknowledgements, received acknowledgements, number of failures, and the write type."
references:
  - https://github.com/apache/cassandra/blob/trunk/doc/native_protocol_v5.spec
---
