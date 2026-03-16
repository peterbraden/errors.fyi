import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'kubernetes');
await mkdir(dir, { recursive: true });

const ref = 'https://kubernetes.io/docs/reference/kubernetes-api/common-definitions/status/';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "Kubernetes API Status Reasons"
description: "Machine-readable reason strings returned in the Status.reason field of Kubernetes API error responses. These accompany an HTTP status code and provide a stable identifier for the error category, independent of the human-readable message."
references:
  - ${ref}
  - https://pkg.go.dev/k8s.io/apimachinery/pkg/apis/meta/v1#StatusReason
---
`);

// [code, name, description]
const codes = [
  ['NotFound',              'Not found',                'The resource does not exist. Returned with HTTP 404. The message will identify the resource type and name.'],
  ['Unauthorized',          'Unauthorised',             'The request requires authentication. The caller has not presented valid credentials. Returned with HTTP 401.'],
  ['Forbidden',             'Forbidden',                'The request is understood but the caller does not have permission to perform the action. Check RBAC ClusterRole and Role bindings. Returned with HTTP 403.'],
  ['AlreadyExists',         'Already exists',           'The resource being created already exists. Use a different name or delete the existing resource first. Returned with HTTP 409.'],
  ['Conflict',              'Conflict',                 'A conflict was detected, typically because a resource was modified between a GET and an update. Retry with a fresh resource version. Returned with HTTP 409.'],
  ['Gone',                  'Gone',                     'The resource previously existed but has been permanently deleted. Returned with HTTP 410, often for watch events on expired resources.'],
  ['Invalid',               'Invalid',                  'The request was structurally valid but failed validation. The Status.details field contains a list of field-level causes identifying each invalid field. Returned with HTTP 422.'],
  ['ServerTimeout',         'Server timeout',           'The server could not return a response in a reasonable time. This is a transient error; retry with exponential backoff. Returned with HTTP 500.'],
  ['Timeout',               'Timeout',                  'The request timed out before it could be completed. The retryAfterSeconds field suggests how long to wait before retrying. Returned with HTTP 504.'],
  ['TooManyRequests',       'Too many requests',        'The client has sent too many requests. The retryAfterSeconds field indicates when to retry. Returned with HTTP 429.'],
  ['BadRequest',            'Bad request',              'The request cannot be processed. The message typically explains the problem, such as a malformed JSON body. Returned with HTTP 400.'],
  ['MethodNotAllowed',      'Method not allowed',       'The HTTP method used is not supported for this resource. For example, PATCH on a resource that only supports GET and DELETE. Returned with HTTP 405.'],
  ['NotAcceptable',         'Not acceptable',           'The server cannot produce a response in the content type requested by the Accept header. Returned with HTTP 406.'],
  ['RequestEntityTooLargeError', 'Request entity too large', 'The request body exceeds the server\'s maximum allowed size. Returned with HTTP 413.'],
  ['UnsupportedMediaType',  'Unsupported media type',   'The Content-Type of the request body is not supported. Use application/json or application/strategic-merge-patch+json. Returned with HTTP 415.'],
  ['InternalError',         'Internal error',           'An unexpected error occurred inside the server. This is a bug or infrastructure problem, not a client error. Check the kube-apiserver logs. Returned with HTTP 500.'],
  ['Expired',               'Expired',                  'The resource version or watch bookmark has expired. The client must re-list or re-establish the watch from the beginning. Returned with HTTP 410.'],
  ['ServiceUnavailable',    'Service unavailable',      'The server is currently unable to handle the request. This is transient; retry with exponential backoff. Returned with HTTP 503.'],
  // kubectl-specific exit reasons (not Status.reason but common operational errors)
  ['ErrImagePull',          'Image pull error',         'The kubelet could not pull the container image. Common causes: the image name or tag is wrong, the registry is unreachable, or image pull secrets are missing or invalid.'],
  ['ImagePullBackOff',      'Image pull backoff',       'The kubelet failed to pull the image repeatedly and is backing off. Check the image name, registry credentials, and network access from the node.'],
  ['CrashLoopBackOff',      'Crash loop backoff',       'The container keeps crashing and restarting. The kubelet is backing off restarts exponentially. Check the container logs to diagnose the root cause.'],
  ['OOMKilled',             'OOM killed',               'The container was killed by the Linux OOM (Out Of Memory) killer because it exceeded its memory limit. Increase the resources.limits.memory, or fix the memory leak.'],
  ['CreateContainerError',  'Create container error',   'The container runtime could not create the container. Common causes: invalid security context, missing volume mounts, or node-level configuration issues.'],
  ['RunContainerError',     'Run container error',       'The container was created but could not be started. Check that the entrypoint or command is correct and executable inside the image.'],
  ['ContainerCannotRun',    'Container cannot run',      'The container was created but the runtime determined it cannot be executed, often because the binary architecture does not match the node.'],
  ['DeadlineExceeded',      'Deadline exceeded',         'The pod did not complete within the activeDeadlineSeconds limit and was terminated by the kubelet.'],
  ['Evicted',               'Evicted',                   'The pod was evicted from the node, typically because the node was under resource pressure (memory or disk). The pod will be rescheduled if managed by a controller.'],
  ['Pending',               'Pending',                   'The pod has been accepted by the cluster but one or more containers have not started. Common causes: insufficient resources, image pull in progress, or volume provisioning pending.'],
  ['Unschedulable',         'Unschedulable',             'The scheduler could not find a node that satisfies all the pod\'s requirements. Check node selectors, taints, resource requests, and affinity rules.'],
];

for (const [code, name, description] of codes) {
  const safeDesc = description.replace(/"/g, '\\"');
  const safeName = name.replace(/"/g, '\\"');
  await writeFile(join(dir, `${code}.md`), `---
name: "${safeName}"
description: "${safeDesc}"
references:
  - ${ref}
---
`);
}

console.log(`Wrote ${codes.length} codes.`);
