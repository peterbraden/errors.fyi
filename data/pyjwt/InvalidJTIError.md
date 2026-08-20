---
name: "InvalidJTIError"
description: "Raised when a token's jti (JWT ID) claim is not a string. Applications that pass a jti check to jwt.decode() to detect replay of a specific token will see this if the claim is missing its expected type."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
