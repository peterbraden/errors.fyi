---
name: SuspiciousOperation
description: "Raised when Django detects potentially malicious input such as a tampered session cookie, a CSRF token mismatch, or invalid multipart data. Subclasses include DisallowedHost and SuspiciousFileOperation. Results in a 400 Bad Request by default."
references:
  - https://docs.djangoproject.com/en/stable/ref/exceptions/#django.core.exceptions.SuspiciousOperation
---
