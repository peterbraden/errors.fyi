---
name: "ImmatureSignatureError"
description: "Raised when a token's nbf (not-before) or iat (issued-at) claim represents a time in the future, so the token isn't valid yet. Often caused by clock skew between the server that issued the token and the one verifying it."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
