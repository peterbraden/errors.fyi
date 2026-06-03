---
name: "Debug Log Message"
description: "Writes a message to the runner debug log, which is only visible when 'Step debug logging' is enabled (repository secret ACTIONS_STEP_DEBUG=true). Use for verbose diagnostic output that would clutter normal logs. Syntax: echo '::debug::Resolved path: /usr/bin/foo'."
references:
  - https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions#setting-a-debug-message
  - https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging
---
