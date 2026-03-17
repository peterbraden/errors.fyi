---
name: "Read Timeout"
numeric: 4096
description: "A read request timed out before sufficient replicas responded to meet the requested consistency level. The error body includes the consistency level, required responses, received responses, and whether the data was retrieved."
references:
  - https://github.com/apache/cassandra/blob/trunk/doc/native_protocol_v5.spec
---
