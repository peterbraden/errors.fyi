---
name: "Write Timeout"
numeric: 4097
description: "A write request timed out before sufficient replicas acknowledged the write to meet the requested consistency level. The error body includes the consistency level, required acknowledgements, received acknowledgements, and the write type."
references:
  - https://github.com/apache/cassandra/blob/trunk/doc/native_protocol_v5.spec
---
