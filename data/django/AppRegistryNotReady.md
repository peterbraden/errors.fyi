---
name: AppRegistryNotReady
description: "Raised when application code tries to access the app registry (e.g. import models) before Django has finished loading all apps. Commonly triggered by top-level model imports in AppConfig.ready() or module-level ORM calls executed at import time."
references:
  - https://docs.djangoproject.com/en/stable/ref/exceptions/#django.core.exceptions.AppRegistryNotReady
---
