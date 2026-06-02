---
name: "ProductionError"
description: "An operation is not permitted in deployment or frozen mode. For example, `bundle install --frozen` raises this when gems are missing from the lockfile. Ensure the lockfile is committed and up to date before deploying."
references:
  - https://bundler.io/man/bundle-install.1.html#DEPLOYMENT-MODE
---
