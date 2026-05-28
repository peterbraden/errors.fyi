---
name: RequestDataTooBig
description: "Raised when a POST body or file upload exceeds DATA_UPLOAD_MAX_MEMORY_SIZE or FILE_UPLOAD_MAX_MEMORY_SIZE (default 2.5 MB). Increase these settings for large uploads, or process data as a stream rather than reading the full body into memory."
references:
  - https://docs.djangoproject.com/en/stable/ref/exceptions/#django.core.exceptions.RequestDataTooBig
---
