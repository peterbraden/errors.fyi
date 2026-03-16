import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'ruby');
await mkdir(dir, { recursive: true });

const ref = 'https://ruby-doc.org/core/Exception.html';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "Ruby Built-in Exceptions"
description: "Built-in exception classes raised by the Ruby interpreter and standard library. All exceptions derive from Exception; most application code rescues subclasses of StandardError."
references:
  - ${ref}
  - https://ruby-doc.org/core/StandardError.html
---
`);

// [name, description]
const codes = [
  // Exception (root)
  ['Exception',               'The root class of all Ruby exceptions. rescue Exception should be avoided in application code as it also catches system signals and interpreter exits; rescue StandardError instead.'],
  ['NoMemoryError',           'Raised when memory allocation fails. Recovery is generally not possible.'],
  ['ScriptError',             'The base class for errors that prevent a script from loading or running: LoadError, NotImplementedError, and SyntaxError.'],
  ['LoadError',               'Raised by require or load when the requested file cannot be found or loaded. The path attribute holds the file that could not be loaded.'],
  ['NotImplementedError',     'Raised when a feature is not implemented on the current platform. For example, calling fork on Windows. Also used by libraries to signal abstract methods.'],
  ['SyntaxError',             'Raised by eval, require, or load when Ruby encounters invalid syntax in a script. The message includes the filename and line number.'],
  ['SignalException',         'Raised when a process receives a signal. The signm attribute holds the signal name.'],
  ['Interrupt',               'A subclass of SignalException raised when the process receives SIGINT, typically by the user pressing Ctrl+C.'],
  ['SystemExit',              'Raised by Kernel#exit. The status attribute holds the integer exit code. Not a StandardError; rescue it explicitly if needed.'],
  ['SystemStackError',        'Raised when the call stack depth exceeds the system limit, typically caused by infinite recursion.'],
  // StandardError and subclasses
  ['StandardError',           'The base class for most rescuable exceptions. rescue StandardError (or a bare rescue) catches all StandardError subclasses but not SignalException, SystemExit, or NoMemoryError.'],
  ['ArgumentError',           'Raised when a method is called with an incorrect number of arguments, or with an argument of the wrong type or value.'],
  ['UncaughtThrowError',      'Raised when throw is called with a tag that has no matching catch block.'],
  ['EncodingError',           'The base class for encoding-related errors.'],
  ['Encoding::CompatibilityError', 'Raised when two strings with incompatible encodings are combined, or when a character cannot be converted to the target encoding.'],
  ['Encoding::InvalidByteSequenceError', 'Raised when a byte sequence is invalid for the string\'s encoding (e.g. a truncated multibyte character).'],
  ['Encoding::UndefinedConversionError', 'Raised when a character in a string has no representation in the target encoding.'],
  ['FiberError',              'Raised when an invalid operation is performed on a Fiber, such as resuming a dead fiber or yielding from the root fiber.'],
  ['IOError',                 'The base class for I/O errors. Raised when an I/O operation fails on an open IO object.'],
  ['EOFError',                'A subclass of IOError raised when reading past the end of a file or stream.'],
  ['IndexError',              'Raised when an index is out of range for an Array or String, or when a key is not found in some contexts.'],
  ['KeyError',                'Raised by Hash#fetch and similar methods when a key is not found and no default is provided.'],
  ['StopIteration',           'Raised to signal that an external iterator has no more elements. Caught by Kernel#loop to terminate the loop cleanly.'],
  ['LocalJumpError',          'Raised when a return, break, or next is used in an invalid context, such as calling a stored Proc after the enclosing method has returned.'],
  ['NameError',               'Raised when a constant, variable, or method name cannot be resolved. The name attribute holds the unresolved identifier.'],
  ['NoMethodError',           'A subclass of NameError raised when a method is called on an object that does not define it, and the object has no method_missing fallback. The name attribute is the method name; receiver is the object.'],
  ['RangeError',              'Raised when a value is outside a valid range, for example when converting a Float to an Integer and the value overflows.'],
  ['FloatDomainError',        'A subclass of RangeError raised for mathematically undefined Float operations, such as converting Float::INFINITY or Float::NAN to an Integer.'],
  ['RegexpError',             'Raised when a string cannot be compiled as a valid regular expression.'],
  ['RuntimeError',            'The default exception class raised by Kernel#raise when no explicit class is given. Also commonly used as a base for custom application errors.'],
  ['FrozenError',             'A subclass of RuntimeError raised when an attempt is made to modify a frozen (immutable) object.'],
  ['SystemCallError',         'The base class for platform-specific system call errors. Subclasses are in the Errno module (e.g. Errno::ENOENT, Errno::EACCES) and map to POSIX errno values.'],
  ['Errno::ENOENT',           'Raised when a file or directory referenced in a system call does not exist. Maps to POSIX errno ENOENT.'],
  ['Errno::EACCES',           'Raised when a file or directory operation is denied due to insufficient permissions. Maps to POSIX errno EACCES.'],
  ['Errno::EEXIST',           'Raised when a file or directory creation fails because the target already exists. Maps to POSIX errno EEXIST.'],
  ['Errno::ECONNREFUSED',     'Raised when a network connection is actively refused by the remote host. Maps to POSIX errno ECONNREFUSED.'],
  ['Errno::ECONNRESET',       'Raised when a network connection is reset by the remote peer. Maps to POSIX errno ECONNRESET.'],
  ['Errno::ETIMEDOUT',        'Raised when a network connection or operation times out. Maps to POSIX errno ETIMEDOUT.'],
  ['Errno::EPIPE',            'Raised when a write is attempted on a pipe or socket with no reader. Maps to POSIX errno EPIPE.'],
  ['Errno::ENOTEMPTY',        'Raised when rmdir is called on a directory that still contains entries. Maps to POSIX errno ENOTEMPTY.'],
  ['ThreadError',             'Raised for invalid Thread operations, such as calling join on a thread from within itself, or deadlocking.'],
  ['TypeError',               'Raised when an object is not of the expected type, for example passing a String where an Integer is required.'],
  ['ZeroDivisionError',       'Raised when an integer is divided by zero. Note that Float division by zero returns Infinity or NaN rather than raising.'],
  ['Math::DomainError',       'Raised by methods in the Math module when the argument is outside the domain of the function (e.g. Math.sqrt(-1) or Math.asin(2)).'],
  // Timeout (standard library)
  ['Timeout::Error',          'Raised by Timeout.timeout when the block does not complete within the specified time. A subclass of RuntimeError.'],
  // JSON (standard library)
  ['JSON::ParserError',       'Raised by JSON.parse when the input string is not valid JSON.'],
];

for (const [name, description] of codes) {
  const safeDesc = description.replace(/"/g, '\\"');
  const filename = name.replace(/::/g, '--');
  await writeFile(join(dir, `${filename}.md`), `---
name: "${name}"
description: "${safeDesc}"
references:
  - ${ref}
---
`);
}

console.log(`Wrote ${codes.length} codes.`);
