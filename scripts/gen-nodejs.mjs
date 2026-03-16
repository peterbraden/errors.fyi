import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'nodejs');
await mkdir(dir, { recursive: true });

const ref = 'https://nodejs.org/api/errors.html';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "Node.js Error Codes"
description: "Symbolic error codes (ERR_*) thrown by the Node.js runtime. These appear as the code property on Error objects and identify the specific cause more precisely than the message string."
references:
  - ${ref}
---
`);

// [code, name, description]
const codes = [
  // Argument / type validation
  ['ERR_INVALID_ARG_TYPE', 'Invalid argument type', 'A function was called with an argument of the wrong type. The error message specifies the expected and received types.'],
  ['ERR_INVALID_ARG_VALUE', 'Invalid argument value', 'A function was called with an argument whose value is not acceptable, such as a negative buffer size.'],
  ['ERR_OUT_OF_RANGE', 'Value out of range', 'A numeric argument is outside the acceptable range. The error message includes the valid bounds.'],
  ['ERR_MISSING_ARGS', 'Missing required arguments', 'A required argument was not provided to a Node.js API function.'],
  ['ERR_AMBIGUOUS_ARGUMENT', 'Ambiguous argument', 'A function argument is ambiguous, usually because a test assertion was called in a way that suggests a mistake.'],
  ['ERR_ARG_NOT_ITERABLE', 'Argument is not iterable', 'A value was passed where an iterable (such as an array or generator) was required.'],
  ['ERR_INVALID_CALLBACK', 'Invalid callback', 'A callback argument was required but was not provided or is not a function.'],
  ['ERR_INCOMPATIBLE_OPTION_PAIR', 'Incompatible option pair', 'Two options were specified that cannot be used together.'],
  // Module system
  ['ERR_MODULE_NOT_FOUND', 'Module not found', 'A required or imported module could not be resolved. Check the specifier and that the package is installed.'],
  ['ERR_REQUIRE_ESM', 'Cannot require ES module', 'require() was used to load an ES module. Use import() or convert the file to CommonJS.'],
  ['ERR_PACKAGE_IMPORT_NOT_EXPORTED', 'Package import not exported', 'The package.json exports field does not expose the requested subpath.'],
  ['ERR_PACKAGE_PATH_NOT_EXPORTED', 'Package path not exported', 'The package.json exports map does not expose the requested internal path.'],
  ['ERR_UNSUPPORTED_DIR_IMPORT', 'Unsupported directory import', 'A directory URL was used as an ES module import specifier, which is not supported.'],
  ['ERR_UNKNOWN_FILE_EXTENSION', 'Unknown file extension', 'The file extension is not recognised by the ES module loader.'],
  ['ERR_INVALID_PACKAGE_CONFIG', 'Invalid package config', 'The package.json file is malformed or contains invalid fields.'],
  ['ERR_INVALID_MODULE_SPECIFIER', 'Invalid module specifier', 'The import or require specifier string is not a valid URL, package name, or path.'],
  ['ERR_REQUIRE_ASYNC_MODULE', 'Cannot require async module', 'An ES module that contains top-level await cannot be loaded with require().'],
  // File system
  ['ERR_FS_FILE_TOO_LARGE', 'File too large', 'The file exceeds the maximum allowed size for a read-into-buffer operation.'],
  ['ERR_FS_INVALID_SYMLINK_TYPE', 'Invalid symlink type', 'An invalid symlink type was passed to fs.symlink() or fs.symlinkSync(). Must be file, dir, or junction.'],
  ['ERR_DIR_CLOSED', 'Directory handle closed', 'An operation was attempted on a fs.Dir handle that has already been closed.'],
  // Streams
  ['ERR_STREAM_DESTROYED', 'Stream destroyed', 'A method was called on a stream that has already been destroyed.'],
  ['ERR_STREAM_ALREADY_FINISHED', 'Stream already finished', 'A method was called on a stream after it has finished, such as writing to a response after end().'],
  ['ERR_STREAM_CANNOT_PIPE', 'Cannot pipe to a non-writable stream', 'stream.pipe() was called on a stream that is not writable.'],
  ['ERR_STREAM_NULL_VALUES', 'Null values not allowed in non-object mode', 'A null chunk was written to a stream not operating in object mode.'],
  ['ERR_STREAM_PUSH_AFTER_EOF', 'Cannot push after EOF', 'stream.push() was called on a readable stream after null (EOF) had been pushed.'],
  ['ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'Cannot unshift after end', 'stream.unshift() was called after the end event was emitted.'],
  ['ERR_STREAM_WRITE_AFTER_END', 'Write after end', 'A write was attempted to a stream after stream.end() was called.'],
  ['ERR_TRANSFORM_ALREADY_TRANSFORMING', 'Transform already transforming', 'A Transform stream received a new chunk while still processing a previous one.'],
  ['ERR_TRANSFORM_WITH_LENGTH_0', 'Transform ended with buffered data', 'A Transform stream finished with data remaining in the write buffer that was never flushed.'],
  // HTTP
  ['ERR_HTTP_HEADERS_SENT', 'Headers already sent', 'An attempt was made to set or send HTTP headers after they were already sent to the client.'],
  ['ERR_HTTP_INVALID_HEADER_VALUE', 'Invalid HTTP header value', 'An HTTP header value contains characters that are not permitted.'],
  ['ERR_HTTP_INVALID_STATUS_CODE', 'Invalid HTTP status code', 'The status code provided is outside the valid range (100–999).'],
  ['ERR_HTTP_TRAILER_INVALID', 'Invalid trailer', 'A trailer was set but the Transfer-Encoding header does not allow trailers.'],
  ['ERR_HTTP2_STREAM_CANCEL', 'HTTP/2 stream cancelled', 'An HTTP/2 stream was cancelled before completion.'],
  ['ERR_HTTP2_CONNECT_AUTHORITY', 'HTTP/2 CONNECT missing authority', 'An HTTP/2 CONNECT request was made without the :authority pseudo-header.'],
  ['ERR_HTTP2_INVALID_HEADER_VALUE', 'Invalid HTTP/2 header value', 'An HTTP/2 header contains a value with invalid characters.'],
  ['ERR_HTTP2_INVALID_STREAM', 'Invalid HTTP/2 stream', 'An operation was performed on an HTTP/2 stream that is no longer valid.'],
  ['ERR_HTTP2_TOO_MANY_INVALID_FRAMES', 'Too many invalid HTTP/2 frames', 'The HTTP/2 peer sent too many invalid protocol frames and the connection was closed.'],
  // TLS / Crypto
  ['ERR_TLS_CERT_ALTNAME_INVALID', 'TLS certificate alt name invalid', 'The hostname does not match any Subject Alternative Name in the TLS certificate.'],
  ['ERR_TLS_HANDSHAKE_TIMEOUT', 'TLS handshake timeout', 'The TLS handshake timed out. The connection was destroyed.'],
  ['ERR_TLS_INVALID_PROTOCOL_VERSION', 'Invalid TLS protocol version', 'The specified TLS protocol version is not valid.'],
  ['ERR_TLS_PROTOCOL_VERSION_CONFLICT', 'TLS protocol version conflict', 'The minimum and maximum TLS protocol versions conflict.'],
  ['ERR_TLS_RENEGOTIATION_DISABLED', 'TLS renegotiation disabled', 'TLS renegotiation was attempted on a connection where it has been disabled.'],
  ['ERR_TLS_SESSION_ATTACK', 'TLS session attack', 'Excessive TLS renegotiations were detected, suggesting a session attack. The connection was closed.'],
  ['ERR_CRYPTO_INCOMPATIBLE_KEY', 'Incompatible crypto key', 'The provided cryptographic key is incompatible with the requested operation.'],
  ['ERR_CRYPTO_INVALID_DIGEST', 'Invalid crypto digest', 'The specified hash algorithm is not supported.'],
  ['ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE', 'Invalid key object type', 'The crypto key object type (public, private, secret) is wrong for the requested operation.'],
  ['ERR_CRYPTO_SCRYPT_INVALID_PARAMETER', 'Invalid scrypt parameter', 'The scrypt key derivation parameters are invalid or incompatible with each other.'],
  // Child process
  ['ERR_CHILD_PROCESS_STDIO_MAXBUFFER', 'Child process stdio maxBuffer exceeded', 'The output from a child process exceeded the maxBuffer option. The process was killed.'],
  ['ERR_CHILD_PROCESS_IPC_REQUIRED', 'Child process IPC required', 'The fork() method requires an IPC channel but none was specified.'],
  // Worker threads
  ['ERR_WORKER_OUT_OF_MEMORY', 'Worker out of memory', 'The worker thread terminated because it hit the memory limit set via the resourceLimits option.'],
  ['ERR_WORKER_PATH', 'Invalid worker path', 'The path to the worker script must be an absolute path or start with ./ or ../.'],
  ['ERR_WORKER_UNSERIALIZABLE_ERROR', 'Unserializable worker error', 'An uncaught exception in a worker thread could not be serialised and transferred to the main thread.'],
  ['ERR_WORKER_UNSUPPORTED_OPERATION', 'Unsupported worker operation', 'The requested functionality is not supported inside a worker thread.'],
  // Buffers
  ['ERR_BUFFER_OUT_OF_BOUNDS', 'Buffer out of bounds', 'An offset or length argument is outside the bounds of the Buffer.'],
  ['ERR_BUFFER_TOO_LARGE', 'Buffer too large', 'An attempt was made to create a Buffer larger than the maximum allowed size.'],
  ['ERR_INVALID_BUFFER_SIZE', 'Invalid buffer size', 'A pool allocation was made with a size that does not match the Buffer pool.'],
  // DNS
  ['ERR_DNS_SET_SERVERS_FAILED', 'Failed to set DNS servers', 'c-ares failed to set the DNS server list. The addresses may be invalid.'],
  // Events / async
  ['ERR_EVENT_RECURSION', 'Event recursion', 'An attempt was made to recursively dispatch the same event on an EventTarget.'],
  ['ERR_MULTIPLE_CALLBACK', 'Multiple callback', 'A callback was called more than once. Node.js stream internals require callbacks to be called exactly once.'],
  ['ERR_ASYNC_CALLBACK', 'Async callback required', 'AsyncLocalStorage.run() requires a callback function.'],
  ['ERR_UNHANDLED_ERROR', 'Unhandled error event', 'An error event was emitted but no listener is registered for the error event.'],
  // WASI / NAPI
  ['ERR_WASI_ALREADY_STARTED', 'WASI already started', 'The WASI instance has already been started and cannot be started again.'],
  ['ERR_NAPI_CONS_FUNCTION', 'N-API constructor must be a function', 'While using N-API, the passed constructor is not a function.'],
  // Encoding
  ['ERR_ENCODING_NOT_SUPPORTED', 'Encoding not supported', 'The specified encoding is not supported by the TextDecoder or TextEncoder.'],
  ['ERR_ENCODING_INVALID_ENCODED_DATA', 'Invalid encoded data', 'The data provided to TextDecoder is invalid for the specified encoding.'],
  // Miscellaneous
  ['ERR_FALSY_VALUE_REJECTION', 'Falsy value rejection', 'A Promise created via util.callbackify() was rejected with a falsy value.'],
  ['ERR_FEATURE_UNAVAILABLE_ON_PLATFORM', 'Feature unavailable on platform', 'The requested feature is not available on the current operating system or architecture.'],
  ['ERR_ILLEGAL_CONSTRUCTOR', 'Illegal constructor', 'An attempt was made to construct an object using a non-public constructor.'],
  ['ERR_INVALID_IP_ADDRESS', 'Invalid IP address', 'The string is not a valid IP address.'],
  ['ERR_INVALID_SYNC_FORK_INPUT', 'Invalid sync fork input', 'A non-string was provided as stdio input to a synchronous child_process method.'],
  ['ERR_INVALID_THIS', 'Invalid this', 'A Node.js API function was called with an incompatible this value.'],
  ['ERR_INVALID_URI', 'Invalid URI', 'An invalid URI was passed to a function.'],
  ['ERR_METHOD_NOT_IMPLEMENTED', 'Method not implemented', 'A method is required but has not been implemented.'],
  ['ERR_NO_CRYPTO', 'Node.js built without crypto', 'Node.js was compiled without OpenSSL support and a crypto operation was attempted.'],
  ['ERR_NO_ICU', 'Node.js built without ICU', 'Node.js was compiled without ICU support, which is required for the requested operation.'],
  ['ERR_OPERATION_FAILED', 'Operation failed', 'An operation failed, typically as a result of an underlying I/O error.'],
  ['ERR_SERVER_ALREADY_LISTEN', 'Server already listening', 'server.listen() was called on a server that is already listening.'],
  ['ERR_SERVER_NOT_RUNNING', 'Server not running', 'server.close() was called on a server that is not running.'],
  ['ERR_SOCKET_ALREADY_BOUND', 'Socket already bound', 'socket.bind() was called on a socket that has already been bound.'],
  ['ERR_SOCKET_BAD_BUFFER_SIZE', 'Invalid socket buffer size', 'The UDP buffer size option is invalid — it must be a non-negative integer.'],
  ['ERR_SOCKET_DGRAM_NOT_RUNNING', 'Datagram socket not running', 'A UDP operation was attempted on a socket that is not running.'],
  ['ERR_STRING_TOO_LONG', 'String too long', 'An attempt was made to create a string longer than the maximum allowed length.'],
  ['ERR_SYNTHETIC', 'Synthetic error', 'A synthetic error used to capture a stack trace for diagnostic purposes.'],
  ['ERR_SYSTEM_ERROR', 'System error', 'An unspecified system error occurred. Check the syscall and errno properties for details.'],
  ['ERR_TTY_INIT_FAILED', 'TTY initialisation failed', 'The TTY could not be initialised due to a system error.'],
  ['ERR_UNAVAILABLE_DURING_EXIT', 'Unavailable during exit', 'A Node.js core module function was called during the process exit callback.'],
  ['ERR_UNKNOWN_CREDENTIAL', 'Unknown credential', 'An unknown Unix user or group identifier was passed to a process method.'],
  ['ERR_UNKNOWN_ENCODING', 'Unknown encoding', 'The specified encoding option is invalid or unknown.'],
  ['ERR_UNKNOWN_SIGNAL', 'Unknown signal', 'An invalid or unknown process signal was specified.'],
  ['ERR_USE_AFTER_CLOSE', 'Use after close', 'An API was called on a resource that has already been closed.'],
  ['ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING', 'VM dynamic import callback missing', 'A dynamic import() was used in a vm.Script without providing the importModuleDynamically callback.'],
  ['ERR_VM_MODULE_ALREADY_LINKED', 'VM module already linked', 'The module has already been linked and cannot be linked again.'],
  ['ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA', 'Cannot create cached data for module', 'Cached data cannot be created for a module that has already been evaluated.'],
  ['ERR_VM_MODULE_DIFFERENT_CONTEXT', 'VM module different context', 'The linker function returned a module from a different context than the parent module.'],
  ['ERR_VM_MODULE_NOT_MODULE', 'VM module not a module', 'The value returned by the linker function is not a vm.Module instance.'],
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
