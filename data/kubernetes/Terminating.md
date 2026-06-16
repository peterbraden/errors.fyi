---
name: "Terminating"
description: "The pod has received a deletion request and is in the process of graceful shutdown. Containers receive SIGTERM and have up to terminationGracePeriodSeconds (default 30s) to exit before being force-killed. If a pod is stuck Terminating, a finalizer may be preventing deletion."
references:
  - https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination
---
