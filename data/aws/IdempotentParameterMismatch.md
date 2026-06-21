---
name: "Idempotent parameter mismatch"
description: "A retried EC2 request reused a client token from a prior request but changed one or more other parameters. Use a new client token for requests with different parameters."
references:
  - https://docs.aws.amazon.com/ec2/latest/devguide/ec2-api-idempotency.html
---
