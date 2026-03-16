import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'aws');
await mkdir(dir, { recursive: true });

const ref = 'https://docs.aws.amazon.com/general/latest/gr/aws-service-information.html';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "AWS Error Codes"
description: "Error codes returned by Amazon Web Services APIs. Codes appear in the Code field of an error response alongside an HTTP status and a human-readable Message. Service-specific codes are prefixed or documented per-service."
references:
  - ${ref}
  - https://docs.aws.amazon.com/AWSEC2/latest/APIReference/errors-overview.html
  - https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html
---
`);

// [code, name, description]
const codes = [
  // Common / global errors (apply across most services)
  ['AccessDenied', 'Access denied', 'The caller does not have permission to perform the requested action. Check IAM policies attached to the user, role, or resource.'],
  ['AccessDeniedException', 'Access denied exception', 'An exception form of the access denial error used by newer SDK-style APIs. The caller lacks the required IAM permissions.'],
  ['AuthFailure', 'Authentication failure', 'The request could not be authenticated. The AWS credentials are missing, invalid, or expired.'],
  ['ExpiredToken', 'Expired token', 'The security token used in the request has expired. Refresh the credentials (e.g. re-assume the IAM role or request new temporary credentials).'],
  ['ExpiredTokenException', 'Expired token exception', 'The security token has expired. Commonly returned when STS temporary credentials or an EC2 instance profile token has lapsed.'],
  ['IncompleteSignature', 'Incomplete signature', 'The request signature is missing required components. Ensure the AWS SDK is computing the Signature Version 4 signature correctly.'],
  ['InvalidAction', 'Invalid action', 'The action specified in the request is not valid for this service. Check for typos in the Action parameter.'],
  ['InvalidClientTokenId', 'Invalid client token ID', 'The X.509 certificate or AWS access key ID provided in the request is not valid or does not match the expected format.'],
  ['InvalidParameterCombination', 'Invalid parameter combination', 'Two or more parameters in the request are mutually exclusive or form an invalid combination.'],
  ['InvalidParameterValue', 'Invalid parameter value', 'A parameter value is out of range, malformed, or otherwise unacceptable. The error message identifies which parameter and why.'],
  ['InvalidQueryParameter', 'Invalid query parameter', 'The query string contains an invalid or unknown parameter.'],
  ['MalformedQueryString', 'Malformed query string', 'The query string is not valid and cannot be parsed.'],
  ['MissingAction', 'Missing action', 'The request is missing the Action parameter which identifies the API operation.'],
  ['MissingAuthenticationToken', 'Missing authentication token', 'The request must include an authentication token but none was provided.'],
  ['MissingParameter', 'Missing parameter', 'A required parameter was not provided in the request. The error message names the missing parameter.'],
  ['NotAuthorized', 'Not authorised', 'The caller is not authorised to perform the requested action. Equivalent to AccessDenied for some services.'],
  ['OptInRequired', 'Opt-in required', 'The AWS account must be explicitly opted in to use this service or feature. Visit the service page in the AWS console to subscribe.'],
  ['RequestExpired', 'Request expired', 'The request arrived too far outside of the server\'s accepted time window. Synchronise the client clock with an NTP server.'],
  ['ServiceUnavailable', 'Service unavailable', 'The service is temporarily unavailable. Retry using exponential backoff.'],
  ['ThrottlingException', 'Throttling exception', 'The request rate has exceeded the service\'s throttling limit. Implement exponential backoff with jitter and reduce the request rate.'],
  ['Throttling', 'Throttling', 'The request was throttled because it exceeded the allowed rate for the account or API. Retry with exponential backoff.'],
  ['TooManyRequestsException', 'Too many requests', 'The client has sent too many requests in a given amount of time. Back off and retry.'],
  ['UnauthorizedOperation', 'Unauthorised operation', 'The current user or role does not have permission to perform this operation. Common in EC2 when IAM policies are too restrictive.'],
  ['UnknownParameter', 'Unknown parameter', 'The request includes a parameter that is not recognised by the service. This may indicate an SDK version mismatch.'],
  ['UnsupportedProtocol', 'Unsupported protocol', 'The request used a protocol that is not supported. Use HTTPS.'],
  ['ValidationError', 'Validation error', 'Input validation failed. One or more parameters did not pass server-side validation. The message usually names the offending field.'],
  ['ValidationException', 'Validation exception', 'A validation error used by SDK-style APIs. Input did not satisfy constraints defined for the operation.'],
  // S3-specific
  ['NoSuchBucket', 'No such bucket', 'The specified S3 bucket does not exist or you do not have access to it. Bucket names are globally unique; the bucket may have been deleted or never created.'],
  ['NoSuchKey', 'No such key', 'The specified S3 object key does not exist in the bucket. Check the key name and bucket name for typos.'],
  ['BucketAlreadyExists', 'Bucket already exists', 'The requested S3 bucket name is already in use globally by another AWS account. S3 bucket names must be globally unique.'],
  ['BucketAlreadyOwnedByYou', 'Bucket already owned by you', 'The bucket you attempted to create already exists and is owned by your account.'],
  ['BucketNotEmpty', 'Bucket not empty', 'The S3 bucket cannot be deleted because it still contains objects. Delete all objects (including versions and delete markers) first.'],
  ['NoSuchUpload', 'No such multipart upload', 'The specified multipart upload ID does not exist or the upload has already been completed or aborted.'],
  ['PreconditionFailed', 'Precondition failed', 'A conditional request (e.g. If-Match or If-None-Match) was not met. The object exists but does not match the specified ETag.'],
  ['InvalidBucketName', 'Invalid bucket name', 'The specified bucket name is not valid. Bucket names must be 3–63 characters, lowercase, and contain only letters, numbers, and hyphens.'],
  // IAM / STS-specific
  ['EntityAlreadyExists', 'Entity already exists', 'An IAM entity (user, group, role, or policy) with the specified name already exists.'],
  ['NoSuchEntity', 'No such entity', 'The requested IAM entity (user, group, role, or policy) does not exist.'],
  ['InvalidUserType', 'Invalid user type', 'The user type specified in the request is not valid.'],
  ['LimitExceeded', 'Limit exceeded', 'The request would cause an IAM limit to be exceeded. Examples include the maximum number of roles per account or policies per role.'],
  // DynamoDB-specific
  ['ConditionalCheckFailedException', 'Conditional check failed', 'A DynamoDB conditional write (PutItem, UpdateItem, or DeleteItem with a ConditionExpression) failed because the condition evaluated to false.'],
  ['ProvisionedThroughputExceededException', 'Provisioned throughput exceeded', 'The DynamoDB table or index has consumed more read or write capacity than the provisioned throughput allows. Increase provisioned capacity or use on-demand mode.'],
  ['ResourceNotFoundException', 'Resource not found', 'The requested DynamoDB table or index does not exist.'],
  ['TransactionConflictException', 'Transaction conflict', 'A DynamoDB item was accessed by a conflicting transaction. Retry the transaction.'],
  ['ItemCollectionSizeLimitExceededException', 'Item collection size limit exceeded', 'A DynamoDB item collection (a partition key and all items sharing it in a local secondary index) has exceeded the 10 GB per-partition limit.'],
  // EC2-specific
  ['InsufficientInstanceCapacity', 'Insufficient instance capacity', 'AWS does not currently have enough capacity to fulfil the EC2 instance request in the selected Availability Zone. Try a different AZ, instance type, or use a Spot request.'],
  ['InstanceLimitExceeded', 'Instance limit exceeded', 'The request would exceed the EC2 instance limit for the account in this region. Request a limit increase via AWS Support.'],
  ['InvalidAMIID.NotFound', 'AMI not found', 'The specified AMI ID does not exist in this region. AMIs are region-specific; copy the AMI to the target region if needed.'],
  ['InvalidInstanceID.NotFound', 'Instance not found', 'The specified EC2 instance ID does not exist or is not in the expected state.'],
  ['InvalidKeyPair.NotFound', 'Key pair not found', 'The specified key pair does not exist in this region.'],
  ['InvalidSecurityGroupID.NotFound', 'Security group not found', 'The specified security group ID does not exist in the VPC.'],
  ['InvalidSubnetID.NotFound', 'Subnet not found', 'The specified subnet ID does not exist.'],
  ['InvalidVpcID.NotFound', 'VPC not found', 'The specified VPC ID does not exist in this region.'],
  // Lambda-specific
  ['ResourceConflictException', 'Resource conflict', 'The Lambda function or resource is currently being modified by another operation. Retry after a short delay.'],
  ['TooManyRequestsException', 'Too many requests (Lambda)', 'The Lambda function invocation rate has exceeded the account\'s concurrency limit. Request a limit increase or implement throttling on the caller.'],
  ['InvalidRequestContentException', 'Invalid request content', 'The request body for a Lambda invocation could not be parsed.'],
  // RDS-specific
  ['DBInstanceNotFound', 'DB instance not found', 'The specified RDS DB instance does not exist in this region.'],
  ['DBSnapshotNotFound', 'DB snapshot not found', 'The specified RDS DB snapshot does not exist.'],
  ['InsufficientDBInstanceCapacity', 'Insufficient DB instance capacity', 'The requested RDS DB instance class is not currently available.'],
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
