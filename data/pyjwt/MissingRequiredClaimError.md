---
name: "MissingRequiredClaimError"
description: "Raised when a claim listed in the require option passed to jwt.decode() is not present in the token's claim set. Used to enforce that claims like exp or aud are mandatory rather than merely validated when present."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
