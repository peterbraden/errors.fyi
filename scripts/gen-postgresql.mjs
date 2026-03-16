import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'postgresql');
await mkdir(dir, { recursive: true });

const ref = 'https://www.postgresql.org/docs/current/errcodes-appendix.html';

const write = async (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "PostgreSQL Error Codes"
description: "SQLSTATE error codes returned by PostgreSQL. Each code is five characters: the first two identify the class, the last three the specific condition."
references:
  - ${ref}
---
`);

// [sqlstate, name, description]
const codes = [
  // Class 00
  ['00000', 'Successful completion', 'The statement completed successfully.'],
  // Class 01 — Warning
  ['01000', 'Warning', 'A warning was generated. The statement completed but produced one or more non-fatal advisory messages.'],
  ['01003', 'Null value eliminated in set function', 'One or more null values were ignored by an aggregate function such as SUM or AVG.'],
  ['01004', 'String data right truncation', 'A string value was truncated to fit the target column length.'],
  ['01006', 'Privilege not revoked', 'A REVOKE statement did not revoke the specified privilege because it was not held.'],
  ['01007', 'Privilege not granted', 'A GRANT statement did not grant the privilege because it was already held.'],
  ['01P01', 'Deprecated feature', 'A deprecated feature was used. It may be removed in a future version of PostgreSQL.'],
  // Class 02 — No data
  ['02000', 'No data', 'A SELECT INTO, INSERT ... SELECT, or FETCH returned no rows.'],
  // Class 03
  ['03000', 'SQL statement not yet complete', 'An SQL statement was not yet complete when execution was attempted.'],
  // Class 08 — Connection
  ['08000', 'Connection exception', 'A connection error occurred.'],
  ['08001', 'SQL client unable to establish SQL connection', 'The client was unable to establish a connection to the server.'],
  ['08003', 'Connection does not exist', 'An operation was attempted on a connection that does not exist.'],
  ['08004', 'SQL server rejected establishment of SQL connection', 'The server refused the connection, typically due to authentication failure or resource limits.'],
  ['08006', 'Connection failure', 'The connection failed after being established, such as a network interruption mid-query.'],
  ['08007', 'Transaction resolution unknown', 'The transaction may or may not have committed; the outcome could not be determined after a connection failure.'],
  ['08P01', 'Protocol violation', 'The server received a message that violated the frontend/backend protocol.'],
  // Class 09
  ['09000', 'Triggered action exception', 'An error occurred in a trigger.'],
  // Class 0A — Feature not supported
  ['0A000', 'Feature not supported', 'The attempted operation is not supported by this version of PostgreSQL.'],
  // Class 0B
  ['0B000', 'Invalid transaction initiation', 'A transaction was started in a context where it is not permitted.'],
  // Class 20
  ['20000', 'Case not found', 'A CASE expression had no matching WHEN clause and no ELSE clause.'],
  // Class 21
  ['21000', 'Cardinality violation', 'A subquery or set operation returned more rows than expected, such as a scalar subquery returning multiple rows.'],
  // Class 22 — Data exception
  ['22000', 'Data exception', 'An error in the format or value of data was detected.'],
  ['22001', 'String data right truncation', 'A string value is too long for the target type and silent truncation is not permitted.'],
  ['22002', 'Null value, no indicator parameter', 'A null value was returned where no null indicator was provided.'],
  ['22003', 'Numeric value out of range', 'A numeric value exceeds the range of the target type.'],
  ['22004', 'Null value not allowed', 'A null value was supplied where one is not permitted.'],
  ['22005', 'Error in assignment', 'An error occurred during assignment of a value.'],
  ['22007', 'Invalid datetime format', 'A datetime string could not be parsed.'],
  ['22008', 'Datetime field overflow', 'A datetime value is outside the valid range.'],
  ['22009', 'Invalid time zone displacement value', 'The specified time zone offset is invalid.'],
  ['22012', 'Division by zero', 'An arithmetic expression attempted to divide by zero.'],
  ['22015', 'Interval field overflow', 'An interval value overflowed the representable range.'],
  ['22018', 'Invalid character value for cast', 'A string value cannot be cast to the target type because it contains characters not valid for that type.'],
  ['22019', 'Invalid escape character', 'The escape character in a LIKE pattern is invalid.'],
  ['22021', 'Character not in repertoire', 'A character could not be represented in the target encoding.'],
  ['22022', 'Indicator overflow', 'An indicator variable overflowed.'],
  ['22023', 'Invalid parameter value', 'A function was called with an invalid parameter value.'],
  ['22024', 'Unterminated C string', 'A C string in the query is not properly null-terminated.'],
  ['22025', 'Invalid escape sequence', 'A string contains an invalid escape sequence.'],
  ['22026', 'String data length mismatch', 'The length of a string did not match the expected length.'],
  ['2201B', 'Invalid regular expression', 'The supplied regular expression pattern is syntactically invalid.'],
  ['2201E', 'Invalid argument for logarithm', 'The argument to a logarithm function must be positive.'],
  ['2201F', 'Invalid argument for power function', 'The arguments to the power function are invalid, such as 0 raised to a negative exponent.'],
  ['2202E', 'Array subscript error', 'An array subscript is out of bounds.'],
  ['22P01', 'Floating point exception', 'A floating-point operation produced an exceptional result such as overflow or not-a-number.'],
  ['22P02', 'Invalid text representation', 'The text string cannot be parsed as the target type.'],
  ['22P03', 'Invalid binary representation', 'The binary format of a value is invalid for the target type.'],
  ['22P04', 'Bad copy file format', 'The data file for a COPY operation is malformed.'],
  ['22P05', 'Untranslatable character', 'A character in the query or data cannot be translated to the server encoding.'],
  ['22032', 'Invalid JSON text', 'The supplied value is not valid JSON.'],
  ['22035', 'No SQL/JSON item', 'A JSON path expression found no matching item.'],
  ['22034', 'More than one SQL/JSON item', 'A JSON path expression was expected to return a single item but returned multiple.'],
  // Class 23 — Integrity constraint violation
  ['23000', 'Integrity constraint violation', 'A generic integrity constraint was violated.'],
  ['23001', 'Restrict violation', 'A DELETE or UPDATE was blocked by a RESTRICT referential action.'],
  ['23502', 'Not null violation', 'A NOT NULL constraint was violated: a null value was inserted into a column that does not allow nulls.'],
  ['23503', 'Foreign key violation', 'A foreign key constraint was violated: the referenced row does not exist, or a referenced row is being deleted while dependent rows remain.'],
  ['23505', 'Unique violation', 'A unique or primary key constraint was violated: a duplicate value already exists in the column or index.'],
  ['23514', 'Check violation', 'A CHECK constraint was violated: the inserted or updated value does not satisfy the constraint expression.'],
  ['23P01', 'Exclusion violation', 'An exclusion constraint was violated.'],
  // Class 24 — Cursor state
  ['24000', 'Invalid cursor state', 'A cursor operation was attempted when the cursor was not in an appropriate state.'],
  // Class 25 — Transaction state
  ['25000', 'Invalid transaction state', 'An operation was attempted that is not permitted in the current transaction state.'],
  ['25001', 'Active SQL transaction', 'A command was issued that is not permitted within an active transaction block.'],
  ['25006', 'Read only SQL transaction', 'A write operation was attempted in a read-only transaction.'],
  ['25P01', 'No active SQL transaction', 'A command was issued that requires an active transaction but none is in progress.'],
  ['25P02', 'In failed SQL transaction', 'A command was issued after a previous error aborted the transaction. The transaction must be rolled back before issuing further commands.'],
  ['25P03', 'Idle in transaction session timeout', 'The session was terminated because it remained idle in an open transaction for longer than idle_in_transaction_session_timeout.'],
  // Class 26
  ['26000', 'Invalid SQL statement name', 'A prepared statement with the specified name does not exist.'],
  // Class 27
  ['27000', 'Triggered data change violation', 'A trigger violated a constraint on the data it modified.'],
  // Class 28 — Authorisation
  ['28000', 'Invalid authorization specification', 'The supplied authorization credentials are invalid.'],
  ['28P01', 'Invalid password', 'An incorrect password was provided during authentication.'],
  // Class 2B
  ['2BP01', 'Dependent objects still exist', 'An object cannot be dropped because other objects depend on it. Use DROP ... CASCADE to remove dependent objects as well.'],
  // Class 2D
  ['2D000', 'Invalid transaction termination', 'A COMMIT or ROLLBACK was issued in a context where it is not permitted.'],
  // Class 34
  ['34000', 'Invalid cursor name', 'The specified cursor name does not exist.'],
  // Class 3B
  ['3B001', 'Invalid savepoint specification', 'The specified savepoint name does not exist.'],
  // Class 3D
  ['3D000', 'Invalid catalog name', 'The specified database does not exist.'],
  // Class 3F
  ['3F000', 'Invalid schema name', 'The specified schema does not exist.'],
  // Class 40 — Transaction rollback
  ['40000', 'Transaction rollback', 'The transaction was rolled back.'],
  ['40001', 'Serialization failure', 'The transaction could not be serialized due to a conflict with another concurrent transaction. The transaction may be retried.'],
  ['40002', 'Transaction integrity constraint violation', 'A constraint was violated during the transaction in a way that requires rollback.'],
  ['40003', 'Statement completion unknown', 'The server connection was lost and it is unknown whether the statement completed.'],
  ['40P01', 'Deadlock detected', 'A deadlock was detected between two or more transactions waiting for each other. PostgreSQL automatically aborts one of them.'],
  // Class 42 — Syntax / access
  ['42000', 'Syntax error or access rule violation', 'A generic syntax or access error occurred.'],
  ['42501', 'Insufficient privilege', 'The current user does not have the required permission to perform the operation.'],
  ['42601', 'Syntax error', 'The SQL statement contains a syntax error.'],
  ['42602', 'Invalid name', 'An identifier is syntactically invalid.'],
  ['42611', 'Invalid column definition', 'A column definition is invalid.'],
  ['42622', 'Name too long', 'An identifier exceeds the maximum allowed length (63 bytes by default).'],
  ['42701', 'Duplicate column', 'A column name is used more than once in the same table definition or SELECT list.'],
  ['42702', 'Ambiguous column', 'A column reference is ambiguous because multiple tables in scope have a column with that name.'],
  ['42703', 'Undefined column', 'A referenced column does not exist in any table in scope.'],
  ['42704', 'Undefined object', 'A referenced object (such as a type, operator, or function) does not exist.'],
  ['42710', 'Duplicate object', 'An object with the specified name already exists.'],
  ['42712', 'Duplicate alias', 'The same alias is used more than once in a query.'],
  ['42723', 'Duplicate function', 'A function with the same name and argument types already exists.'],
  ['42725', 'Ambiguous function', 'The function call matches more than one function in the search path.'],
  ['42803', 'Grouping error', 'A column referenced in the SELECT list is not in the GROUP BY clause and is not inside an aggregate function.'],
  ['42804', 'Datatype mismatch', 'The supplied value is of a type that is incompatible with the expected type.'],
  ['42809', 'Wrong object type', 'The referenced object is of the wrong type for this operation, such as using a table name where a function name is expected.'],
  ['42830', 'Invalid foreign key', 'A foreign key definition is invalid.'],
  ['42846', 'Cannot coerce', 'The supplied value cannot be implicitly cast to the required type.'],
  ['42883', 'Undefined function', 'No function matches the specified name and argument types.'],
  ['42939', 'Reserved name', 'The specified name is reserved and cannot be used.'],
  ['42P01', 'Undefined table', 'The referenced table or view does not exist.'],
  ['42P02', 'Undefined parameter', 'A query parameter reference ($n) does not correspond to a supplied parameter.'],
  ['42P03', 'Duplicate cursor', 'A cursor with the specified name already exists.'],
  ['42P04', 'Duplicate database', 'A database with the specified name already exists.'],
  ['42P05', 'Duplicate prepared statement', 'A prepared statement with the specified name already exists.'],
  ['42P06', 'Duplicate schema', 'A schema with the specified name already exists.'],
  ['42P07', 'Duplicate table', 'A table with the specified name already exists in the schema.'],
  ['42P08', 'Ambiguous parameter', 'A query parameter is ambiguous because its type cannot be determined.'],
  ['42P18', 'Indeterminate datatype', 'The type of an expression could not be determined. An explicit cast may be needed.'],
  ['42P20', 'Windowing error', 'An invalid use of a window function was detected.'],
  ['44000', 'WITH CHECK OPTION violation', 'An INSERT or UPDATE through a view with a WITH CHECK OPTION clause produced a row that would not be visible through the view.'],
  // Class 53 — Resources
  ['53000', 'Insufficient resources', 'A resource limit was exceeded.'],
  ['53100', 'Disk full', 'The disk is full and the operation cannot be completed.'],
  ['53200', 'Out of memory', 'PostgreSQL ran out of memory while processing the query.'],
  ['53300', 'Too many connections', 'The maximum number of database connections has been reached. Close an existing connection before opening a new one.'],
  ['53400', 'Configuration limit exceeded', 'A configuration-defined limit was exceeded.'],
  // Class 54
  ['54000', 'Program limit exceeded', 'A program limit such as maximum expression depth was exceeded.'],
  ['54001', 'Statement too complex', 'The SQL statement is too complex to be planned or executed.'],
  ['54011', 'Too many columns', 'A table definition or query contains more columns than PostgreSQL supports.'],
  ['54023', 'Too many arguments', 'A function was called with more arguments than it accepts.'],
  // Class 55 — Object state
  ['55000', 'Object not in prerequisite state', 'The object is not in the expected state for this operation.'],
  ['55006', 'Object in use', 'The object is currently in use by another process and cannot be accessed.'],
  ['55P02', 'Cannot change runtime parameter', 'The configuration parameter cannot be changed after the server has started or in this context.'],
  ['55P03', 'Lock not available', 'The requested lock could not be acquired because NOWAIT was specified or the lock_timeout was exceeded.'],
  // Class 57 — Operator intervention
  ['57000', 'Operator intervention', 'The query was terminated by operator action.'],
  ['57014', 'Query cancelled', 'The query was cancelled by the user (typically via pg_cancel_backend()) or by statement_timeout.'],
  ['57P01', 'Admin shutdown', 'The server is shutting down and terminated the connection.'],
  ['57P02', 'Crash shutdown', 'The server crashed and the connection was lost.'],
  ['57P03', 'Cannot connect now', 'The server is starting up and not yet ready to accept connections.'],
  ['57P04', 'Database dropped', 'The database was dropped while the session was connected to it.'],
  ['57P05', 'Idle session timeout', 'The session was terminated because it was idle for longer than idle_session_timeout.'],
  // Class 58 — System error
  ['58000', 'System error', 'An operating system or hardware error occurred.'],
  ['58030', 'IO error', 'An I/O error occurred while reading or writing a data file.'],
  ['58P01', 'Undefined file', 'A required file could not be found.'],
  ['58P02', 'Duplicate file', 'A file already exists where PostgreSQL is trying to create one.'],
  // Class 72
  ['72000', 'Snapshot too old', 'The query cannot be completed because the snapshot used by the transaction has become too old (requires old_snapshot_threshold to be set).'],
  // Class F0
  ['F0000', 'Config file error', 'An error was detected in the PostgreSQL configuration file.'],
  ['F0001', 'Lock file exists', 'A lock file already exists, indicating another server instance may be running on the same data directory.'],
  // Class P0 — PL/pgSQL
  ['P0000', 'PL/pgSQL error', 'An unspecified error occurred in a PL/pgSQL function.'],
  ['P0001', 'Raise exception', 'A PL/pgSQL RAISE EXCEPTION statement was executed.'],
  ['P0002', 'No data found', 'A SELECT INTO or FETCH in a PL/pgSQL function returned no rows where at least one was expected.'],
  ['P0003', 'Too many rows', 'A SELECT INTO in a PL/pgSQL function returned more than one row where exactly one was expected.'],
  ['P0004', 'Assert failure', 'A PL/pgSQL ASSERT statement failed.'],
  // Class XX — Internal
  ['XX000', 'Internal error', 'An internal error occurred in PostgreSQL. This indicates a bug; please report it.'],
  ['XX001', 'Data corrupted', 'On-disk data structures are corrupted.'],
  ['XX002', 'Index corrupted', 'An index is corrupted and needs to be rebuilt.'],
];

for (const [code, name, description] of codes) {
  // Escape any double-quotes in description
  const safeDesc = description.replace(/"/g, '\\"');
  const safeName = name.replace(/"/g, '\\"');
  await write(`${code}.md`, `---
name: "${safeName}"
description: "${safeDesc}"
references:
  - ${ref}
---
`);
}

console.log(`Wrote ${codes.length} codes.`);
