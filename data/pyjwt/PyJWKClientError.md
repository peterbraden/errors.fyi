---
name: "PyJWKClientError"
description: "Raised by PyJWKClient when it cannot resolve the signing key for a token from a remote JWKS endpoint — for example the token's kid (key ID) header doesn't match any key in the fetched JWK set."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
