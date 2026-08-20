---
name: "InvalidTokenError"
description: "Base exception raised when jwt.decode() fails on a token. Most of PyJWT's specific validation errors (expired, wrong audience, wrong issuer, and so on) subclass this, so catching InvalidTokenError is a common way to treat any invalid-token condition as a single failure case."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
