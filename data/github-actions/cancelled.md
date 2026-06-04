---
name: "Cancelled"
description: "The workflow run was cancelled before the step or job completed, either manually or because a dependent job failed with fail-fast. Steps that need to run after a cancellation must explicitly include cancelled() in their if condition."
references:
  - https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-conditions-to-control-job-execution
---
