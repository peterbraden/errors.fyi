---
name: "InvalidKeyError"
description: "Raised when the key passed to jwt.encode() or jwt.decode() is not in the format the chosen algorithm expects — for example passing a raw string where a PEM-formatted RSA/EC key object is required, or a malformed PEM block."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
