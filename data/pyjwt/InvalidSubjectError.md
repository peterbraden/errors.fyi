---
name: "InvalidSubjectError"
description: "Raised when a token's sub (subject) claim is not a string, or doesn't match the expected subject value passed to jwt.decode(). Indicates the token identifies a different principal than the one the caller expected."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
