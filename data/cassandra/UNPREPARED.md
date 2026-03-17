---
name: "Unprepared"
numeric: 9472
description: "The server does not recognise the prepared statement ID sent in an EXECUTE request, typically because the statement was evicted from the server's prepared statement cache. The client should re-prepare the statement and retry."
references:
  - https://github.com/apache/cassandra/blob/trunk/doc/native_protocol_v5.spec
---
