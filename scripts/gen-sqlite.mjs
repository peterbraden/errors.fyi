import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'sqlite');
await mkdir(dir, { recursive: true });

const ref = 'https://www.sqlite.org/rescode.html';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "SQLite Result Codes"
description: "Integer result codes returned by SQLite C API functions. Primary result codes occupy the low 8 bits; extended result codes add detail in the higher bits and are a superset of the primary codes."
references:
  - ${ref}
---
`);

// [symbolic, numeric, name, description]
const codes = [
  // Primary result codes
  ['SQLITE_OK',         0,   'OK',                    'The operation completed successfully.'],
  ['SQLITE_ERROR',      1,   'Generic error',          'A generic error. This is the default error code when no more specific code applies.'],
  ['SQLITE_INTERNAL',   2,   'Internal error',         'An internal logic error in SQLite. If you see this it is likely a bug in SQLite itself.'],
  ['SQLITE_PERM',       3,   'Permission denied',      'The requested access mode for a newly created database could not be provided.'],
  ['SQLITE_ABORT',      4,   'Callback requested abort', 'An operation was aborted prior to completion, usually at the application\'s request via a progress handler or authoriser callback.'],
  ['SQLITE_BUSY',       5,   'Database file locked',   'The database file is locked by another connection. For WAL-mode databases, SQLITE_BUSY_SNAPSHOT gives more detail.'],
  ['SQLITE_LOCKED',     6,   'Table locked',           'A write operation could not continue because of a conflict within the same database connection (e.g. a table needed by one statement is locked by another).'],
  ['SQLITE_NOMEM',      7,   'Out of memory',          'SQLite was unable to allocate the memory it needed to complete the operation.'],
  ['SQLITE_READONLY',   8,   'Read-only database',     'An attempt was made to write to a read-only database, a read-only file, or a database for which the caller lacks write permission.'],
  ['SQLITE_INTERRUPT',  9,   'Interrupted',            'The operation was interrupted by a call to sqlite3_interrupt(). Any prepared statements associated with the connection are rolled back.'],
  ['SQLITE_IOERR',      10,  'I/O error',              'The operating system reported an I/O error while SQLite was reading or writing the database file. Check disk health and filesystem integrity.'],
  ['SQLITE_CORRUPT',    11,  'Disk image malformed',   'The database file appears to be corrupted. Run PRAGMA integrity_check and restore from a backup if needed.'],
  ['SQLITE_NOTFOUND',   12,  'Not found',              'A file was not found (used internally by the OS interface layer), or an unknown opcode was passed to sqlite3_file_control().'],
  ['SQLITE_FULL',       13,  'Database full',          'A write could not complete because the disk is full or because the database has reached its maximum size (SQLITE_MAX_PAGE_COUNT).'],
  ['SQLITE_CANTOPEN',   14,  'Unable to open database', 'SQLite was unable to open the database file. The file may not exist, may have wrong permissions, or the path may be invalid.'],
  ['SQLITE_PROTOCOL',   15,  'Locking protocol error', 'A problem with the file locking protocol (usually relevant only on network file systems). The connection should close and reopen the database.'],
  ['SQLITE_EMPTY',      16,  'Database empty',         'Used internally; not normally returned to application code.'],
  ['SQLITE_SCHEMA',     17,  'Schema changed',         'The database schema changed between the time a prepared statement was compiled and when it was stepped. Call sqlite3_prepare() again to recompile.'],
  ['SQLITE_TOOBIG',     18,  'String or BLOB too large', 'A string or BLOB value exceeds the limit set by SQLITE_LIMIT_LENGTH (default 1 billion bytes).'],
  ['SQLITE_CONSTRAINT', 19,  'Constraint violation',   'A constraint (UNIQUE, NOT NULL, CHECK, FOREIGN KEY, or PRIMARY KEY) was violated. Extended result codes identify which constraint.'],
  ['SQLITE_MISMATCH',   20,  'Data type mismatch',     'A value of an incompatible data type was stored in a column with strict type affinity.'],
  ['SQLITE_MISUSE',     21,  'Library used incorrectly', 'The SQLite API was used incorrectly — for example, calling sqlite3_step() on a finalised statement. This indicates a programming error.'],
  ['SQLITE_NOLFS',      22,  'Large file support missing', 'The host operating system does not support large files, and the database file has grown larger than what the OS can handle.'],
  ['SQLITE_AUTH',       23,  'Authorisation denied',   'The sqlite3_set_authorizer() callback denied access to a specific table or action.'],
  ['SQLITE_FORMAT',     24,  'Auxiliary database format error', 'The auxiliary database format is invalid (not used by current SQLite versions; reserved for future use).'],
  ['SQLITE_RANGE',      25,  'Column index out of range', 'The column index passed to sqlite3_bind_*() or sqlite3_column_*() is out of range for the prepared statement.'],
  ['SQLITE_NOTADB',     26,  'Not a database file',    'The file being opened does not appear to be an SQLite database file. The magic number in the header is wrong.'],
  ['SQLITE_NOTICE',     27,  'Notification',           'An informational notification from the SQLite engine, not an error. Extended codes give details (e.g. SQLITE_NOTICE_RECOVER_WAL).'],
  ['SQLITE_WARNING',    28,  'Warning',                'A warning from the SQLite engine. Extended codes give details (e.g. SQLITE_WARNING_AUTOINDEX).'],
  ['SQLITE_ROW',        100, 'Row available',          'sqlite3_step() has returned a row of data that is ready for processing. Call sqlite3_column_*() to retrieve column values, then call sqlite3_step() again.'],
  ['SQLITE_DONE',       101, 'Execution complete',     'sqlite3_step() has finished executing. The statement is complete. Call sqlite3_reset() to reuse it or sqlite3_finalize() to destroy it.'],
  // Extended result codes (most commonly encountered)
  ['SQLITE_ERROR_MISSING_COLLSEQ',   257,  'Missing collating sequence',      'A prepared statement could not be rerun because a user-defined collating sequence required by the statement is no longer defined.'],
  ['SQLITE_ERROR_RETRY',             513,  'Retry',                           'The statement should be retried, typically because a schema change was detected.'],
  ['SQLITE_IOERR_READ',              266,  'I/O error reading',               'An I/O error occurred while reading from the database file.'],
  ['SQLITE_IOERR_SHORT_READ',        522,  'Short read',                      'The read from the database file returned fewer bytes than requested, indicating a possible truncation or corruption.'],
  ['SQLITE_IOERR_WRITE',             778,  'I/O error writing',               'An I/O error occurred while writing to the database file.'],
  ['SQLITE_IOERR_FSYNC',             1034, 'I/O error during fsync',          'An I/O error occurred while fsyncing the database file. Durability of recent writes may be compromised.'],
  ['SQLITE_IOERR_TRUNCATE',          1546, 'I/O error truncating',            'An I/O error occurred while attempting to truncate the database file.'],
  ['SQLITE_IOERR_DELETE',            2570, 'I/O error deleting file',         'An I/O error occurred while attempting to delete a temporary file or journal.'],
  ['SQLITE_IOERR_LOCK',              3850, 'I/O error obtaining lock',        'An I/O error occurred while trying to obtain a file lock.'],
  ['SQLITE_IOERR_NOMEM',             3082, 'I/O layer out of memory',         'The VFS layer ran out of memory during an I/O operation.'],
  ['SQLITE_IOERR_SEEK',              5642, 'I/O error seeking',               'An I/O error occurred while seeking within the database file.'],
  ['SQLITE_IOERR_MMAP',              6154, 'I/O error memory-mapping',        'An error occurred while trying to memory-map the database file.'],
  ['SQLITE_LOCKED_SHAREDCACHE',      262,  'Locked by shared cache',          'A read-write conflict was detected between two database connections sharing the same page cache. Retry after a short delay.'],
  ['SQLITE_BUSY_RECOVERY',           261,  'Busy during WAL recovery',        'Another connection is in the process of recovering a WAL file. Wait for recovery to complete and retry.'],
  ['SQLITE_BUSY_SNAPSHOT',           517,  'Busy snapshot conflict',          'A reader in WAL mode is holding a snapshot that the writer needs to overwrite. The reader must advance to a newer snapshot before the writer can proceed.'],
  ['SQLITE_CANTOPEN_ISDIR',          526,  'Cannot open: is a directory',     'The path given to sqlite3_open() refers to a directory rather than a file.'],
  ['SQLITE_CANTOPEN_FULLPATH',       782,  'Cannot resolve full path',        'SQLite could not convert the relative path to an absolute path while opening the database.'],
  ['SQLITE_CANTOPEN_SYMLINK',        1550, 'Cannot open symlink',             'The SQLITE_OPEN_NOFOLLOW flag was set and the database path is a symbolic link.'],
  ['SQLITE_CORRUPT_VTAB',            267,  'Virtual table corruption',        'Content in the virtual table is inconsistent with what the virtual table expected.'],
  ['SQLITE_CORRUPT_SEQUENCE',        523,  'Sequence table corruption',       'The sqlite_sequence table used to track autoincrement values is corrupted.'],
  ['SQLITE_CORRUPT_INDEX',           779,  'Index corruption',                'An index entry does not match the content of the table it indexes. Run PRAGMA integrity_check.'],
  ['SQLITE_READONLY_RECOVERY',       264,  'Read-only: WAL recovery needed',  'The database requires WAL recovery but is read-only. Open it read-write from another connection first.'],
  ['SQLITE_READONLY_CANTLOCK',       520,  'Read-only: cannot lock',          'SQLite is unable to obtain a shared lock on the WAL file, preventing any read access.'],
  ['SQLITE_READONLY_ROLLBACK',       776,  'Read-only: rollback required',    'A hot journal exists that must be rolled back before the database can be read, but the database is read-only.'],
  ['SQLITE_READONLY_DBMOVED',        1032, 'Read-only: database moved',       'The database file has been moved or renamed since it was opened, making the current file descriptor stale.'],
  ['SQLITE_CONSTRAINT_CHECK',        275,  'CHECK constraint failed',         'A CHECK constraint defined on a table or column was violated by an INSERT or UPDATE.'],
  ['SQLITE_CONSTRAINT_FOREIGNKEY',   787,  'FOREIGN KEY constraint failed',   'A FOREIGN KEY constraint was violated. The referenced parent row does not exist, or a parent row was deleted while child rows remain.'],
  ['SQLITE_CONSTRAINT_NOTNULL',      1299, 'NOT NULL constraint failed',      'A NOT NULL constraint was violated: a NULL value was inserted into a column that requires a non-null value.'],
  ['SQLITE_CONSTRAINT_PRIMARYKEY',   1555, 'PRIMARY KEY constraint failed',   'A PRIMARY KEY constraint was violated: a duplicate value was inserted into a primary key column.'],
  ['SQLITE_CONSTRAINT_TRIGGER',      1811, 'RAISE function called by trigger', 'A trigger used RAISE(ABORT, ...) or RAISE(FAIL, ...) to abort the current statement.'],
  ['SQLITE_CONSTRAINT_UNIQUE',       2067, 'UNIQUE constraint failed',        'A UNIQUE constraint was violated: the inserted or updated value already exists in the unique index.'],
  ['SQLITE_CONSTRAINT_ROWID',        2579, 'ROWID constraint failed',         'A rowid value is not unique within the table (relevant for tables without an explicit INTEGER PRIMARY KEY).'],
  ['SQLITE_NOTICE_RECOVER_WAL',      283,  'Notice: WAL recovery',            'The database was recovered from a WAL file. This is informational; no action is required.'],
  ['SQLITE_WARNING_AUTOINDEX',       284,  'Warning: automatic index created', 'SQLite created an automatic index to satisfy a query because no suitable index existed. Consider adding a persistent index.'],
];

for (const [symbolic, numeric, name, description] of codes) {
  const safeDesc = description.replace(/"/g, '\\"');
  const safeName = name.replace(/"/g, '\\"');
  await writeFile(join(dir, `${symbolic}.md`), `---
name: "${safeName}"
description: "${safeDesc}"
numeric: ${numeric}
references:
  - ${ref}
---
`);
}

console.log(`Wrote ${codes.length} codes.`);
