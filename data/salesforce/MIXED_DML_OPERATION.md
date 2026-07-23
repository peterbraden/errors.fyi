---
name: "Mixed DML Operation"
description: "Apex code attempted to perform DML on setup objects (such as User or Group) and non-setup objects in the same transaction. Salesforce disallows mixing these to avoid locking issues; separate them using @future or Queueable Apex."
references:
  - https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_dml_exception_handling.htm
---
