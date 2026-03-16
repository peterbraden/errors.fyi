import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'mongodb');
await mkdir(dir, { recursive: true });

const ref = 'https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.yml';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "MongoDB Error Codes"
description: "Numeric error codes returned in the MongoDB server response document under the code field. Client drivers also surface these via exception types. Codes are stable across MongoDB versions."
references:
  - ${ref}
  - https://www.mongodb.com/docs/manual/reference/error-codes/
---
`);

// [code, name, description]
const codes = [
  ['1',     'InternalError',                      'An unexpected internal error occurred in the server. This is a MongoDB bug; report it with the full log output.'],
  ['2',     'BadValue',                            'A command parameter has an invalid value — wrong type, out of range, or not permitted in this context.'],
  ['4',     'NoSuchKey',                           'A required key was not found in a document or BSON object during command processing.'],
  ['9',     'FailedToParse',                       'The server could not parse the command or query. The message identifies the location of the parsing failure.'],
  ['13',    'Unauthorized',                        'The authenticated user does not have permission to perform the operation. Check the user\'s assigned roles.'],
  ['14',    'TypeMismatch',                        'An operation expected a BSON value of one type but received another.'],
  ['16',    'InvalidLength',                       'A value exceeded the maximum allowed length, such as a namespace exceeding 120 characters.'],
  ['17',    'ProtocolError',                       'The client sent a message that violates the MongoDB wire protocol.'],
  ['18',    'AuthenticationFailed',                'The provided credentials are incorrect or the authentication mechanism failed.'],
  ['20',    'IllegalOperation',                    'The operation is not permitted in the current context, for example modifying a capped collection in an unsupported way.'],
  ['22',    'InvalidBSON',                         'The request contains malformed or invalid BSON.'],
  ['24',    'LockTimeout',                         'The operation timed out waiting to acquire a lock.'],
  ['26',    'NamespaceNotFound',                   'The specified collection or database does not exist. The namespace (database.collection) was not found.'],
  ['27',    'IndexNotFound',                       'The specified index does not exist on the collection.'],
  ['40',    'ConflictingUpdateOperators',           'The update document contains conflicting update operators, such as two $set operators affecting the same field path.'],
  ['43',    'CursorNotFound',                      'The cursor ID is not valid on this server, typically because the cursor has expired (default 10 minutes of inactivity) or was already exhausted.'],
  ['46',    'CursorKilled',                        'The cursor was explicitly killed by another operation or by the server during a primary step-down.'],
  ['50',    'MaxTimeMSExpired',                    'The operation exceeded the time limit set by maxTimeMS. The query or command was killed by the server.'],
  ['51',    'MaxTimeMSExpiredError',               'Alias for MaxTimeMSExpired used in some driver versions.'],
  ['59',    'CommandNotFound',                     'The command name sent in the request is not recognised by the server.'],
  ['61',    'ShardKeyNotFound',                    'The document being inserted into a sharded collection does not contain the shard key.'],
  ['66',    'ImmutableField',                      'An attempt was made to modify an immutable field, such as the _id field or a shard key field.'],
  ['67',    'CannotCreateIndex',                   'The index could not be created, for example because it conflicts with an existing index or the index specification is invalid.'],
  ['68',    'IndexAlreadyExists',                  'An index with the same name or key pattern already exists on the collection.'],
  ['72',    'InvalidIdField',                      'The _id field value is invalid — for example, it contains an array, a regex, or another prohibited type.'],
  ['73',    'InvalidDBRef',                        'A DBRef (database reference) is malformed or refers to a non-existent collection.'],
  ['85',    'IndexOptionsConflict',                'The index options specified conflict with an existing index of the same name.'],
  ['86',    'IndexKeySpecsConflict',               'The index key specification conflicts with an existing index on the collection.'],
  ['89',    'NetworkInterfaceExceededTimeLimit',   'A network operation exceeded its time limit at the driver or mongos level.'],
  ['91',    'ShutdownInProgress',                  'The server is shutting down and cannot accept new operations.'],
  ['96',    'InterruptedAtShutdown',               'The operation was interrupted because the server began shutting down while processing it.'],
  ['112',   'WriteConflict',                       'A write operation conflicted with a concurrent transaction or multi-document write. Retry the transaction.'],
  ['115',   'CommandFailed',                       'A command failed on a shard or replica set member and the error was propagated to the client.'],
  ['120',   'NotPrimaryNoSecondaryOk',             'The operation was sent to a secondary but requires a primary, and the secondary-ok flag was not set.'],
  ['121',   'DocumentValidationFailure',           'The document to be inserted or updated failed JSON Schema validation rules defined on the collection.'],
  ['125',   'CommandNotSupported',                 'The command is not supported by this version of MongoDB or in this configuration.'],
  ['126',   'NamespaceExists',                     'An attempt was made to create a collection or database that already exists.'],
  ['136',   'ExceededTimeLimit',                   'The operation exceeded a time limit configured on the server (distinct from maxTimeMS).'],
  ['148',   'SnapshotTooOld',                      'The snapshot used by the read operation is too old. The history is no longer available. Retry the read.'],
  ['166',   'TransactionTooLarge',                 'The transaction has accumulated too many operations or too much data and cannot be committed.'],
  ['167',   'UnknownTransactionCommitResult',      'The commit result for the transaction is unknown — it may or may not have committed. The client should use retryable commits to resolve.'],
  ['189',   'ElectionInProgress',                  'A replica set election is in progress. Retry the operation after the election completes.'],
  ['190',   'IncompleteTransactionHistory',        'The transaction history on the oplog is incomplete and the operation cannot be completed.'],
  ['197',   'NoSuchTransaction',                   'The transaction with the given lsid and txnNumber does not exist on the server.'],
  ['200',   'QueryPlanKilled',                     'The query plan was killed, typically because a collection was dropped or an index was removed while the query was running.'],
  ['251',   'NoSuchTransaction',                   'There is no active transaction with the specified session ID and transaction number.'],
  ['11000', 'DuplicateKey',                        'A write violated a unique index constraint. The key value already exists in the index. The keyValue field identifies the conflicting key.'],
  ['11600', 'InterruptedDueToReplStateChange',     'The operation was interrupted because the replica set primary stepped down or a failover occurred.'],
  ['13297', 'DatabaseDifferCase',                  'A database with the same name but different case already exists.'],
  ['13388', 'StaleConfig',                         'The mongos has stale routing information for a shard. The driver should retry; mongos will refresh its metadata.'],
  ['16755', 'Location16755',                       'The $elemMatch projection operator cannot be used with a query on the same field path — a common mistake when building projections.'],
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
