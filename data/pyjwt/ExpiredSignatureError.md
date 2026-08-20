---
name: "ExpiredSignatureError"
description: "Raised when a token's exp (expiration time) claim indicates that it has expired. This is one of the most common JWT failures in production and normally means the client should refresh the token or re-authenticate rather than retry the same request."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
