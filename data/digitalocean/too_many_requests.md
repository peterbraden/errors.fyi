---
name: "Too Many Requests"
description: "The client has exceeded the API rate limit. Current limits are returned in the RateLimit-Limit, RateLimit-Remaining, and RateLimit-Reset response headers. Back off and retry after the reset time, ideally with exponential backoff."
references:
  - https://docs.digitalocean.com/reference/api/api-reference/
  - https://docs.digitalocean.com/reference/api/api-reference/#section/Introduction/Rate-Limit
---
