---
name: "Bad Nonce"
description: "The client sent an unacceptable anti-replay nonce in the Replay-Nonce header, because it was missing, malformed, or already used. The client should retry the request using a fresh nonce from the Replay-Nonce header of the error response."
references:
  - https://www.rfc-editor.org/rfc/rfc8555#section-6.7
---
