---
name: "InvalidIssuedAtError"
description: "Raised when a token's iat (issued-at) claim is present but non-numeric, so PyJWT cannot interpret it as a timestamp. Check whatever issued the token — it should set iat to a numeric NumericDate value (seconds since the Unix epoch)."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
