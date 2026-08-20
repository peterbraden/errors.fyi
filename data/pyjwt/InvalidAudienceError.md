---
name: "InvalidAudienceError"
description: "Raised when a token's aud (audience) claim does not match one of the expected audience values passed to jwt.decode(). Indicates the token was issued for a different service or client than the one verifying it."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
