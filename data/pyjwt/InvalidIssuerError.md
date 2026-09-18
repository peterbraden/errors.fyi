---
name: "InvalidIssuerError"
description: "Raised when a token's iss (issuer) claim does not match the expected issuer passed to jwt.decode(). Usually means the token was issued by an authority the verifier doesn't trust for this check, or the wrong issuer string was configured."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
