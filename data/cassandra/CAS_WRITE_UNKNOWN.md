---
name: "CAS Write Unknown"
numeric: 4102
description: "A lightweight transaction (compare-and-set) write timed out and it is unknown whether the mutation was applied. The error body includes the consistency level, required Paxos phase acknowledgements, and received acknowledgements."
references:
  - https://github.com/apache/cassandra/blob/trunk/doc/native_protocol_v5.spec
---
