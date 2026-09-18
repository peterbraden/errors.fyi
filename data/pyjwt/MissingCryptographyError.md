---
name: "MissingCryptographyError"
description: "Raised when the chosen algorithm (such as RS256 or ES256) requires the optional cryptography package and it isn't installed. Fix by installing PyJWT with the crypto extra, e.g. pip install 'pyjwt[crypto]'."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
