---
name: "Abort Handler"
description: "A panic value used to abort an HTTP handler and close the connection without sending a response. Panicking with this value suppresses the server's stack trace logging."
references:
  - https://pkg.go.dev/net/http#ErrAbortHandler
---
