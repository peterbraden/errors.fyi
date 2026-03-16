import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'python');
await mkdir(dir, { recursive: true });

const ref = 'https://docs.python.org/3/library/exceptions.html';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "Python Built-in Exceptions"
description: "Built-in exception classes raised by the Python interpreter and standard library. All exceptions derive from BaseException; most application code catches subclasses of Exception."
references:
  - ${ref}
---
`);

// [name, description]
const codes = [
  // BaseException subclasses (not Exception)
  ['BaseException', 'The base class of all built-in exceptions. Application code should not catch this directly; catch Exception instead, as BaseException also includes SystemExit, KeyboardInterrupt, and GeneratorExit.'],
  ['SystemExit', 'Raised by sys.exit(). If not caught, the interpreter exits cleanly. The args[0] attribute holds the exit status: 0 or None means success, any other integer is the exit code, a string is printed to stderr.'],
  ['KeyboardInterrupt', 'Raised when the user presses the interrupt key (Ctrl+C or Delete). Derives from BaseException so that finally blocks run but most broad except clauses do not accidentally suppress it.'],
  ['GeneratorExit', 'Raised inside a generator or coroutine when generator.close() is called. The generator should either catch and re-raise it, or not catch it at all.'],
  // Exception
  ['Exception', 'The base class for all non-system-exiting exceptions. User-defined exceptions should derive from this class.'],
  ['StopIteration', 'Raised by the built-in next() and by an iterator\'s __next__() method to signal that there are no further items. Propagation out of a generator function is converted to a return.'],
  ['StopAsyncIteration', 'Raised by an asynchronous iterator\'s __anext__() method to signal that there are no further items.'],
  // Arithmetic
  ['ArithmeticError', 'The base class for arithmetic exceptions: FloatingPointError, OverflowError, and ZeroDivisionError.'],
  ['FloatingPointError', 'Raised when a floating-point operation fails. In practice this is rarely raised directly; most platforms map FPU errors to NaN or Infinity instead.'],
  ['OverflowError', 'Raised when the result of an arithmetic operation is too large to be represented. This does not occur for integers (which can grow arbitrarily large), but can occur for float operations.'],
  ['ZeroDivisionError', 'Raised when the second argument of a division or modulo operation is zero. The message indicates whether integer division, float division, or modulo was attempted.'],
  // Assertion
  ['AssertionError', 'Raised by a failing assert statement. If the assertion has a message, it becomes the exception\'s first argument.'],
  // Attribute
  ['AttributeError', 'Raised when attribute access or assignment fails, for example accessing a nonexistent attribute on an object. The name and obj attributes (Python 3.12+) identify the missing attribute and the object.'],
  // Buffer
  ['BufferError', 'Raised when a buffer-related operation cannot be performed, typically because a buffer is already exported via the buffer protocol.'],
  // EOF
  ['EOFError', 'Raised by input() when it reaches end-of-file without reading any data. io.IOBase.read() returns an empty bytes object at EOF rather than raising this exception.'],
  // Import
  ['ImportError', 'Raised when an import statement fails to find the module or when a from ... import fails to find a name in the module. The name and path attributes give the missing name and file path.'],
  ['ModuleNotFoundError', 'A subclass of ImportError raised when a module cannot be located at all. Distinguishable from ImportError, which may also be raised if a module is found but cannot be loaded.'],
  // Lookup
  ['LookupError', 'The base class for IndexError and KeyError — errors raised when a lookup key or index is invalid.'],
  ['IndexError', 'Raised when a sequence subscript is out of range. Slice indices are silently truncated; out-of-range integer indices raise this exception.'],
  ['KeyError', 'Raised when a mapping key is not found in the set of existing keys. The missing key is stored as the first argument.'],
  // Memory
  ['MemoryError', 'Raised when an operation runs out of memory. The interpreter may be in an inconsistent state when this is raised; recovery is difficult.'],
  // Name
  ['NameError', 'Raised when a local or global name is not found. The name attribute (Python 3.12+) holds the undefined identifier.'],
  ['UnboundLocalError', 'A subclass of NameError raised when a local variable is referenced before it has been assigned a value.'],
  // OS / IO
  ['OSError', 'The base class for I/O and system call failures. Also accessible as EnvironmentError and IOError. Subclasses cover specific errno values. Key attributes: errno, strerror, filename (and filename2 for two-path operations).'],
  ['BlockingIOError', 'Raised when a non-blocking operation fails because the resource is not ready. errno is EAGAIN, EALREADY, EWOULDBLOCK, or EINPROGRESS. The characters_written attribute gives bytes written before blocking.'],
  ['ChildProcessError', 'Raised when an operation on a child process fails. errno is ECHILD.'],
  ['ConnectionError', 'The base class for connection-related errors: BrokenPipeError, ConnectionAbortedError, ConnectionRefusedError, ConnectionResetError.'],
  ['BrokenPipeError', 'Raised when writing to a pipe while the read end has been closed, or writing to a socket that has been shut down. errno is EPIPE or ESHUTDOWN.'],
  ['ConnectionAbortedError', 'Raised when a connection attempt is aborted by the peer. errno is ECONNABORTED.'],
  ['ConnectionRefusedError', 'Raised when a connection attempt is actively refused by the peer. errno is ECONNREFUSED.'],
  ['ConnectionResetError', 'Raised when a connection is reset by the peer. errno is ECONNRESET.'],
  ['FileExistsError', 'Raised when trying to create a file or directory that already exists. errno is EEXIST.'],
  ['FileNotFoundError', 'Raised when a file or directory is requested but does not exist. errno is ENOENT.'],
  ['InterruptedError', 'Raised when a system call is interrupted by a signal. errno is EINTR. Since Python 3.5, most system calls are retried automatically on EINTR.'],
  ['IsADirectoryError', 'Raised when a file operation is attempted on a directory. errno is EISDIR.'],
  ['NotADirectoryError', 'Raised when a directory operation is attempted on something that is not a directory. errno is ENOTDIR.'],
  ['PermissionError', 'Raised when trying to run an operation without the required access rights. errno is EACCES or EPERM.'],
  ['ProcessLookupError', 'Raised when the given process does not exist. errno is ESRCH.'],
  ['TimeoutError', 'Raised when a system function times out. errno is ETIMEDOUT.'],
  // Reference
  ['ReferenceError', 'Raised when a weak reference proxy is used to access a garbage-collected referent.'],
  // Runtime
  ['RuntimeError', 'Raised when an error is detected that does not fall into any of the other categories. Commonly used as a base for user-defined errors.'],
  ['NotImplementedError', 'A subclass of RuntimeError for abstract methods that have not been implemented. Distinct from the built-in NotImplemented singleton, which is returned by binary special methods.'],
  ['RecursionError', 'A subclass of RuntimeError raised when the maximum recursion depth (sys.getrecursionlimit()) is exceeded.'],
  // Syntax
  ['SyntaxError', 'Raised by the parser or compiler when it encounters a syntax error. Attributes: filename, lineno, offset, text identify the location.'],
  ['IndentationError', 'A subclass of SyntaxError raised when indentation is inconsistent.'],
  ['TabError', 'A subclass of IndentationError raised when indentation mixes tabs and spaces in a way that makes the code ambiguous.'],
  // System
  ['SystemError', 'Raised by the interpreter when it finds an internal error. Should be reported as a Python bug.'],
  // Type
  ['TypeError', 'Raised when an operation or function is applied to an object of an inappropriate type. Common causes: calling a non-callable, passing the wrong number of arguments, or combining incompatible types.'],
  // Value / Unicode
  ['ValueError', 'Raised when a function receives an argument of the right type but an inappropriate value, and the situation is not described by a more specific exception such as IndexError.'],
  ['UnicodeError', 'A subclass of ValueError for Unicode encoding and decoding errors. Subclasses carry encoding, reason, object, start, and end attributes.'],
  ['UnicodeDecodeError', 'Raised when a byte sequence cannot be decoded using the specified codec.'],
  ['UnicodeEncodeError', 'Raised when a string cannot be encoded using the specified codec.'],
  ['UnicodeTranslateError', 'Raised when a string cannot be translated (e.g. via str.encode("ascii", "xmlcharrefreplace")) due to an unmappable character.'],
  // Warnings
  ['Warning', 'The base class for warning categories. Warnings are typically issued with warnings.warn() and filtered by the warnings module.'],
  ['DeprecationWarning', 'Raised for deprecated features that will be removed in a future Python version. Ignored by default except in __main__ and test code.'],
  ['PendingDeprecationWarning', 'Raised for features that may be deprecated in the future. Ignored by default.'],
  ['RuntimeWarning', 'Raised for dubious runtime behaviour, such as coroutines that were never awaited.'],
  ['SyntaxWarning', 'Raised for dubious syntax, such as use of == to compare with None.'],
  ['ResourceWarning', 'Raised when a resource (such as a file or socket) is implicitly closed or destroyed without being explicitly closed. Hidden by default; shown when the interpreter is run with -Wd.'],
  ['FutureWarning', 'Raised for features whose behaviour will change in a future version in a way that is visible to end users.'],
  ['ImportWarning', 'Raised for likely mistakes in module imports. Ignored by default.'],
  ['UnicodeWarning', 'Raised for Unicode-related issues that are not errors, such as unmatched surrogates. Ignored by default.'],
  ['BytesWarning', 'Raised when bytes or bytearray are compared with str, or when bytes are used where str was expected. Enabled with -bb.'],
  ['EncodingWarning', 'Raised (Python 3.10+) when the locale encoding is used implicitly, for example when open() is called without an explicit encoding argument.'],
  // ExceptionGroup (3.11+)
  ['ExceptionGroup', 'Raised (Python 3.11+) to represent multiple concurrent exceptions, typically from asyncio.TaskGroup or the testing framework. Can be caught and unwrapped with except*.'],
];

for (const [name, description] of codes) {
  const safeDesc = description.replace(/"/g, '\\"');
  await writeFile(join(dir, `${name}.md`), `---
name: "${name}"
description: "${safeDesc}"
references:
  - ${ref}
---
`);
}

console.log(`Wrote ${codes.length} codes.`);
