---
name: "InvalidSignatureError"
description: "Raised when a token's signature doesn't match the one PyJWT computes from the payload and the provided key. Usually means the wrong verification key/secret was used, the token was tampered with, or it was signed with a different key than the one being checked against."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
