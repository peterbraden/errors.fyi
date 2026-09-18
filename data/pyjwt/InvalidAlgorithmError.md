---
name: "InvalidAlgorithmError"
description: "Raised when the algorithm specified for signing or verification is not recognized by PyJWT, or is not included in the algorithms list passed to jwt.decode(). Also raised for the notorious 'alg: none' or algorithm-confusion attempt if it isn't explicitly allowed."
references:
  - https://pyjwt.readthedocs.io/en/stable/api.html
  - https://github.com/jpadilla/pyjwt/blob/master/jwt/exceptions.py
---
