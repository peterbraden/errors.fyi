---
name: "Error Annotation"
description: "Creates a red error annotation on the file and line indicated, visible in the workflow summary and in pull request diff views. Syntax: echo '::error file=app.js,line=10,col=4::Missing semicolon'. A step that emits error annotations still needs to exit with a non-zero code to fail the job."
references:
  - https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions#setting-an-error-message
---
