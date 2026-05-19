---
name: "Authentication Required"
description: "The card was declined because the transaction requires authentication (3D Secure / SCA). Retry the payment using Stripe's confirmCardPayment to trigger the authentication challenge instead of a server-side charge."
references:
  - https://stripe.com/docs/declines/codes
  - https://stripe.com/docs/strong-customer-authentication
---
