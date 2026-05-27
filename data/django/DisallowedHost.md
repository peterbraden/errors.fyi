---
name: DisallowedHost
description: "Raised (as a SuspiciousOperation subclass) when the HTTP Host header does not match any entry in settings.ALLOWED_HOSTS. Results in a 400 Bad Request. Add the domain or IP address to ALLOWED_HOSTS, or set ALLOWED_HOSTS = ['*'] during local development."
references:
  - https://docs.djangoproject.com/en/stable/ref/exceptions/#django.core.exceptions.DisallowedHost
---
