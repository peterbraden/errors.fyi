---
name: RequestTimeout
description: "The 408 response indicating the client took too long to send the request. In practice this is usually raised by the WSGI server (e.g. gunicorn's --timeout) rather than Flask application code itself."
references:
  - https://werkzeug.palletsprojects.com/en/stable/exceptions/#werkzeug.exceptions.RequestTimeout
---
