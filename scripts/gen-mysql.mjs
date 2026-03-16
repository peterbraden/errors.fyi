import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'mysql');
await mkdir(dir, { recursive: true });

const ref = 'https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html';

const write = async (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "MySQL / MariaDB Server Error Codes"
description: "Numeric error codes returned by the MySQL and MariaDB server. Clients receive these via the error packet alongside a SQLSTATE value and message string."
references:
  - ${ref}
  - https://mariadb.com/kb/en/mariadb-error-codes/
---
`);

// [code, name, description]
const codes = [
  // Connection / access
  ['1040', 'Too many connections', 'The server has reached its maximum number of simultaneous client connections. Increase max_connections or close idle connections.'],
  ['1044', 'Access denied for user to database', 'The authenticated user does not have permission to access the specified database.'],
  ['1045', 'Access denied for user', 'Authentication failed. The username, password, or host is incorrect, or the account is locked.'],
  ['1129', 'Host blocked due to many connection errors', 'The host has been temporarily blocked because it exceeded max_connect_errors consecutive failed connections. Run FLUSH HOSTS to unblock.'],
  ['1130', 'Host not allowed to connect', 'The client host is not permitted to connect to this MySQL server. Check the user table host column.'],
  ['1203', 'Too many user connections', 'The user has reached the max_user_connections limit. Close an existing connection or increase the limit.'],
  ['1226', 'Max queries per hour exceeded', 'The user has exceeded the max_queries_per_hour resource limit defined in the GRANT statement.'],
  // Database / table existence
  ['1007', 'Database already exists', 'CREATE DATABASE failed because a database with that name already exists.'],
  ['1008', 'Database does not exist', 'DROP DATABASE failed because the specified database does not exist.'],
  ['1049', 'Unknown database', 'The specified database does not exist. Check the database name or create it first.'],
  ['1050', 'Table already exists', 'CREATE TABLE failed because a table with that name already exists in the database.'],
  ['1051', 'Unknown table', 'DROP TABLE or a similar statement referenced a table that does not exist.'],
  ['1146', "Table doesn't exist", 'The referenced table does not exist. It may have been dropped or the name is misspelled.'],
  // Column / key issues
  ['1054', 'Unknown column', 'A column referenced in the query does not exist in any table in scope.'],
  ['1060', 'Duplicate column name', 'Two or more columns in a CREATE TABLE or SELECT list share the same name.'],
  ['1062', 'Duplicate entry', 'An INSERT or UPDATE attempted to create a duplicate value in a column with a UNIQUE or PRIMARY KEY constraint.'],
  ['1064', 'Syntax error', 'The SQL statement contains a syntax error. Check the query near the position indicated in the message.'],
  ['1065', 'Query was empty', 'An empty string was submitted as a query.'],
  ['1066', 'Not unique table or alias', 'The same table name or alias appears more than once in a FROM clause.'],
  ['1067', 'Invalid default value', 'A column definition specifies a DEFAULT value that is not valid for the column type.'],
  ['1068', 'Multiple primary key defined', 'A CREATE TABLE or ALTER TABLE statement attempts to define more than one PRIMARY KEY.'],
  ['1075', 'Incorrect auto column definition', 'An AUTO_INCREMENT column must be defined as a key (PRIMARY KEY or UNIQUE).'],
  ['1091', 'Column or key does not exist', "DROP INDEX or DROP COLUMN failed because the specified index or column does not exist."],
  ['1101', 'BLOB or TEXT cannot have a default value', 'A BLOB or TEXT column was given a DEFAULT clause, which is not permitted.'],
  ['1136', 'Column count does not match value count', 'The number of values in the INSERT statement does not match the number of columns.'],
  ['1166', 'Incorrect column name', 'The column name contains illegal characters or exceeds the maximum length.'],
  ['1171', 'PRIMARY KEY must be NOT NULL', 'All columns in a PRIMARY KEY must be declared NOT NULL.'],
  ['1364', 'Field has no default value', "A column with no DEFAULT value was omitted from an INSERT statement and has no default, and strict mode is enabled."],
  ['1366', 'Incorrect integer value', "A string value that cannot be converted to an integer was inserted into an integer column in strict mode."],
  ['1406', 'Data too long for column', 'The inserted or updated value exceeds the maximum length of the column in strict mode.'],
  // Constraints
  ['1048', 'Column cannot be null', 'A NULL value was inserted into a column declared NOT NULL.'],
  ['1169', 'Unique constraint violation on write', 'A write was blocked because it would create a duplicate value in a unique index.'],
  ['1215', 'Cannot add foreign key constraint', 'A foreign key definition is invalid, typically because column types do not match or the referenced index does not exist.'],
  ['1216', 'Foreign key constraint fails on child insert or update', 'An INSERT or UPDATE on a child table was rejected because the referenced parent row does not exist.'],
  ['1217', 'Foreign key constraint fails on parent delete or update', 'A DELETE or UPDATE on a parent table was rejected because dependent child rows exist.'],
  ['1451', 'Foreign key constraint fails on parent delete', 'Cannot delete or update a parent row because child rows reference it. Delete the child rows first or use CASCADE.'],
  ['1452', 'Foreign key constraint fails on child insert', 'Cannot add or update a child row because the referenced parent row does not exist.'],
  // Transactions / locking
  ['1205', 'Lock wait timeout exceeded', 'The transaction waited longer than innodb_lock_wait_timeout seconds for a row lock. Try the transaction again.'],
  ['1206', 'Total locks exceeds lock table size', 'The total number of locks held exceeds the InnoDB lock table size. Increase innodb_buffer_pool_size or split the transaction.'],
  ['1213', 'Deadlock found', 'InnoDB detected a deadlock between two or more transactions and rolled back one of them. The transaction may be retried.'],
  ['1223', 'Conflicting read lock', 'The query cannot be executed because of an existing conflicting read lock.'],
  // Stored procedures / functions
  ['1304', 'Procedure already exists', 'CREATE PROCEDURE failed because a stored procedure with that name already exists.'],
  ['1305', 'Procedure does not exist', 'The referenced stored procedure or function does not exist.'],
  ['1318', 'Wrong number of arguments for procedure', 'The CALL statement passed the wrong number of arguments to the stored procedure.'],
  ['1320', 'No RETURN found in function', 'A stored FUNCTION body has no RETURN statement.'],
  ['1415', 'Trigger cannot return result set', 'A trigger attempted to return a result set, which is not permitted.'],
  ['1418', 'Function lacks determinism declaration', 'A stored function must be declared DETERMINISTIC, NO SQL, or READS SQL DATA when binary logging is enabled.'],
  ['1419', 'Requires SUPER privilege for binary logging', 'Creating or altering a stored function requires the SUPER privilege when binary logging is enabled and the function is not deterministic.'],
  ['1442', 'Cannot update table in stored function or trigger', 'A stored function or trigger attempted to modify a table that is already being used by the statement that invoked it.'],
  // Query structure
  ['1052', 'Ambiguous column', 'A column name appears in multiple tables in the FROM clause and is not qualified with a table name.'],
  ['1111', 'Invalid use of group function', 'An aggregate function such as SUM() was used in a context where it is not permitted, such as a WHERE clause.'],
  ['1113', 'Table must have at least one column', 'CREATE TABLE was attempted with an empty column list.'],
  ['1172', 'Result contains more than one row', 'A subquery used in a context that expects a single value returned multiple rows.'],
  ['1222', 'UNION columns do not match', 'The SELECT statements in a UNION have different numbers of columns.'],
  ['1241', 'Operand must contain one column', 'A subquery in a comparison context returned more than one column.'],
  ['1242', 'Subquery returns more than one row', 'A scalar subquery returned multiple rows where exactly one was expected.'],
  ['1248', 'Every derived table must have its own alias', 'A subquery used as a derived table in the FROM clause has no alias.'],
  ['1267', 'Illegal mix of collations', 'Two string values with incompatible collations were compared or combined.'],
  ['1292', 'Incorrect value', 'A value is invalid for the target column type, such as an out-of-range date.'],
  ['1364', 'Field has no default value', 'A required column was omitted from an INSERT and strict mode is enabled.'],
  // Resources / storage
  ['1005', 'Cannot create table', 'CREATE TABLE failed. The detailed error from the storage engine is usually in a subsequent error message.'],
  ['1114', 'Table is full', 'The table has reached its maximum size as defined by the storage engine or file system.'],
  ['1021', 'Disk full', 'The disk is full and the operation cannot complete. Free disk space and retry.'],
  ['1030', 'Storage engine error', 'The storage engine returned an error. The numeric code in the message identifies the engine-specific cause.'],
  ['1036', 'Table is read only', 'The table or its file is read-only and cannot be modified.'],
  ['1194', 'Table is marked as crashed', 'The table is marked as crashed and needs to be repaired with REPAIR TABLE.'],
  ['1195', 'Table repair failed', 'REPAIR TABLE or automatic repair after a crash failed. Manual repair may be required.'],
  // Replication
  ['1200', 'Replica already running', 'START SLAVE (or START REPLICA) was issued but replication is already running.'],
  ['1236', 'Fatal replication error reading binary log', 'The replica received a fatal error from the source when reading the binary log. Check the positions and logs.'],
  // Miscellaneous
  ['1100', 'Table locked with read lock', 'A write operation was attempted on a table locked with LOCK TABLES ... READ.'],
  ['1104', 'SELECT would examine too many rows', 'The query was rejected because it would scan more rows than the max_join_size limit.'],
  ['1148', 'Command not allowed', 'The command is not allowed for this MySQL user or in this configuration.'],
  ['1153', 'Packet bigger than max_allowed_packet', 'The client sent a packet larger than the max_allowed_packet server variable. Increase the limit or reduce the packet size.'],
  ['1175', 'Safe update mode', 'In safe-updates mode, an UPDATE or DELETE without a WHERE clause using a key column was rejected.'],
  ['1193', 'Unknown system variable', 'A SET or SELECT @@variable referenced a system variable that does not exist.'],
  ['1231', 'Variable cannot be set to NULL', 'A system variable was set to NULL, which is not a valid value for it.'],
  ['1235', 'Feature not supported in this version', 'The SQL statement uses a feature not supported by this version of MySQL.'],
  ['1251', 'Client does not support authentication protocol', 'The client library is too old to support the authentication plugin required by the server.'],
  ['1264', 'Out of range value for column', 'A numeric value is outside the range permitted by the column type and was adjusted or rejected.'],
  ['1286', 'Unknown storage engine', 'The ENGINE clause specifies a storage engine that is not installed or available.'],
  ['1298', 'Unknown or incorrect time zone', 'The specified time zone name is not in the time zone tables. Run mysql_tzinfo_to_sql to populate them.'],
  ['1390', 'Too many placeholders in prepared statement', 'A prepared statement contains more parameter markers than the server supports (limit is 65535).'],
  ['1461', 'Too many prepared statements', 'The max_prepared_stmt_count limit has been reached. Deallocate unused prepared statements.'],
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
