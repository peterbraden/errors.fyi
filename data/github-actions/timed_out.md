---
name: "Timed Out"
description: "The job exceeded its timeout-minutes limit (default 6 hours, maximum 6 hours for public repos). The runner sends SIGTERM to all running processes and marks the job as timed_out. Increase timeout-minutes or optimize the job to run faster."
references:
  - https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes
---
