---
name: "Read Failure"
numeric: 4098
description: "A read request failed because one or more replicas returned an error rather than a timeout. The error body includes the consistency level, required responses, received responses, number of failures, and whether the data was retrieved."
references:
  - https://github.com/apache/cassandra/blob/trunk/doc/native_protocol_v5.spec
---
