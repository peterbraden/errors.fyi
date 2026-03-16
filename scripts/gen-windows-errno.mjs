import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'windows-errno');
await mkdir(dir, { recursive: true });

const ref = 'https://learn.microsoft.com/en-us/cpp/c-runtime-library/errno-doserrno-sys-errlist-and-sys-nerr';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "Windows CRT errno Codes"
description: "The errno values defined by the Microsoft C Runtime (CRT) and set by standard C library functions on Windows. These differ from POSIX errno in both numeric values and available codes. Symbolic names are defined in <errno.h>."
references:
  - ${ref}
  - https://learn.microsoft.com/en-us/windows/win32/debug/system-error-codes
---
`);

// [numeric, symbolic, name, description]
const codes = [
  // Shared with POSIX (same numeric values as Linux/macOS for these)
  ['1', 'EPERM', 'Operation not permitted', 'The operation is not permitted for the current user or process. Often returned when attempting an operation requiring elevated privileges.'],
  ['2', 'ENOENT', 'No such file or directory', 'The specified file or directory does not exist.'],
  ['3', 'ESRCH', 'No such process', 'The specified process does not exist.'],
  ['4', 'EINTR', 'Interrupted function call', 'An asynchronous signal interrupted the function before it could complete.'],
  ['5', 'EIO', 'Input/output error', 'A physical I/O error occurred, such as a disk read failure.'],
  ['6', 'ENXIO', 'No such device or address', 'The device does not exist or the address is out of range for the device.'],
  ['7', 'E2BIG', 'Argument list too long', 'The argument list passed to an exec function exceeds the system limit.'],
  ['8', 'ENOEXEC', 'Exec format error', 'The file is not a recognised executable format.'],
  ['9', 'EBADF', 'Bad file descriptor', 'The file descriptor is invalid or not open for the requested operation.'],
  ['10', 'ECHILD', 'No child processes', 'The process has no child processes to wait for.'],
  ['11', 'EAGAIN', 'Resource temporarily unavailable', 'The resource is temporarily unavailable. The operation may succeed if retried.'],
  ['12', 'ENOMEM', 'Out of memory', 'Insufficient memory is available to complete the operation.'],
  ['13', 'EACCES', 'Permission denied', 'The process does not have permission to access the file or resource.'],
  ['14', 'EFAULT', 'Bad address', 'A pointer argument points to memory outside the accessible address space.'],
  ['16', 'EBUSY', 'Device or resource busy', 'The device or resource is in use by another process and cannot be accessed.'],
  ['17', 'EEXIST', 'File exists', 'The file already exists and the operation requires it to not exist (e.g. exclusive create).'],
  ['18', 'EXDEV', 'Improper link', 'An attempt was made to create a hard link across different drives or volumes.'],
  ['19', 'ENODEV', 'No such device', 'The specified device does not exist.'],
  ['20', 'ENOTDIR', 'Not a directory', 'A path component that is not a directory was used where a directory was expected.'],
  ['21', 'EISDIR', 'Is a directory', 'The path refers to a directory but the operation requires a regular file.'],
  ['22', 'EINVAL', 'Invalid argument', 'An argument to the function is invalid. This is the most commonly encountered CRT error.'],
  ['23', 'ENFILE', 'Too many files open in system', 'The system-wide limit on open file handles has been reached.'],
  ['24', 'EMFILE', 'Too many open files', 'The process has reached its limit of simultaneously open file handles.'],
  ['25', 'ENOTTY', 'Inappropriate I/O control operation', 'An I/O control operation was attempted on a file that is not a terminal.'],
  ['27', 'EFBIG', 'File too large', 'The file would exceed the maximum allowed size.'],
  ['28', 'ENOSPC', 'No space left on device', 'The device has no space remaining for the write operation.'],
  ['29', 'ESPIPE', 'Invalid seek', 'lseek() was called on a pipe or socket, which does not support seeking.'],
  ['30', 'EROFS', 'Read-only file system', 'A write was attempted on a read-only volume.'],
  ['31', 'EMLINK', 'Too many links', 'The file already has the maximum number of hard links.'],
  ['32', 'EPIPE', 'Broken pipe', 'A write was attempted on a pipe with no reader. The process also receives SIGPIPE.'],
  ['33', 'EDOM', 'Math argument out of domain', 'A math function was called with an argument outside its domain (e.g. sqrt of a negative number).'],
  ['34', 'ERANGE', 'Result too large', 'A math function returned a result too large to be represented.'],
  ['36', 'EDEADLK', 'Resource deadlock avoided', 'A file lock operation would have caused a deadlock, so it was refused.'],
  ['38', 'ENAMETOOLONG', 'Filename too long', 'The path or filename exceeds MAX_PATH (260 characters on Windows).'],
  ['39', 'ENOLCK', 'No locks available', 'The system has run out of file lock resources.'],
  ['40', 'ENOSYS', 'Function not implemented', 'The function is not implemented by the Windows CRT or the underlying OS.'],
  ['41', 'ENOTEMPTY', 'Directory not empty', 'rmdir() was called on a directory that still contains files or subdirectories.'],
  ['42', 'EILSEQ', 'Illegal byte sequence', 'An invalid multibyte character sequence was encountered during conversion.'],
  // MSVC-specific socket/network errno values (100–138)
  ['100', 'EADDRINUSE', 'Address already in use', 'The network address (IP + port) is already bound by another socket.'],
  ['101', 'EADDRNOTAVAIL', 'Address not available', 'The requested network address is not available on the local machine.'],
  ['102', 'EAFNOSUPPORT', 'Address family not supported', 'The address family is not supported by the protocol or socket type.'],
  ['103', 'EALREADY', 'Connection already in progress', 'A non-blocking connect is already in progress on the socket.'],
  ['104', 'EBADMSG', 'Bad message', 'A corrupt or invalid message was received.'],
  ['105', 'ECANCELED', 'Operation cancelled', 'The I/O operation was cancelled, typically by CancelIo() or a timeout.'],
  ['106', 'ECONNABORTED', 'Connection aborted', 'The connection was aborted by the local software, typically due to a protocol error.'],
  ['107', 'ECONNREFUSED', 'Connection refused', 'The target host actively refused the connection, meaning no process is listening on that port.'],
  ['108', 'ECONNRESET', 'Connection reset by peer', 'The connection was forcibly closed by the remote host, typically by sending a TCP RST.'],
  ['109', 'EDESTADDRREQ', 'Destination address required', 'A required destination address was omitted from a sendto() call on an unconnected socket.'],
  ['110', 'EHOSTUNREACH', 'Host unreachable', 'The destination host is unreachable from this machine.'],
  ['111', 'EIDRM', 'Identifier removed', 'The identifier of a IPC object has been removed.'],
  ['112', 'EINPROGRESS', 'Operation in progress', 'A non-blocking socket operation could not be completed immediately.'],
  ['113', 'EISCONN', 'Already connected', 'connect() was called on a socket that is already connected.'],
  ['114', 'ELOOP', 'Too many levels of symbolic links', 'Too many symbolic links were encountered resolving a path.'],
  ['115', 'EMSGSIZE', 'Message too long', 'The message is larger than the maximum size supported by the underlying transport.'],
  ['116', 'ENETDOWN', 'Network is down', 'The network subsystem has failed.'],
  ['117', 'ENETRESET', 'Connection aborted by network', 'The connection was broken because the remote host reset during the operation.'],
  ['118', 'ENETUNREACH', 'Network unreachable', 'No route to the destination network exists.'],
  ['119', 'ENOBUFS', 'No buffer space available', 'Insufficient buffer space is available for the socket operation.'],
  ['120', 'ENODATA', 'No message available', 'No data is available on the read queue.'],
  ['121', 'ENOLINK', 'Link has been severed', 'The communication link has been severed.'],
  ['122', 'ENOMSG', 'No message of desired type', 'There is no message of the desired type in the message queue.'],
  ['123', 'ENOPROTOOPT', 'No such protocol option', 'The socket option is not supported by the protocol.'],
  ['124', 'ENOSR', 'No STREAM resources', 'Insufficient STREAMS resources are available.'],
  ['125', 'ENOSTR', 'Not a STREAM', 'The file descriptor is not a STREAMS device.'],
  ['126', 'ENOTCONN', 'Socket not connected', 'send() or recv() was called on an unconnected socket.'],
  ['127', 'ENOTRECOVERABLE', 'State not recoverable', 'A mutex or other synchronisation object is in an unrecoverable state.'],
  ['128', 'ENOTSOCK', 'Not a socket', 'The file descriptor does not refer to a socket.'],
  ['129', 'ENOTSUP', 'Not supported', 'The operation is not supported by this implementation.'],
  ['130', 'EOPNOTSUPP', 'Operation not supported on socket', 'The operation is not supported on this type of socket.'],
  ['131', 'EOTHER', 'Other error', 'An unclassified error occurred.'],
  ['132', 'EOVERFLOW', 'Value too large', 'A value is too large to be stored in the result type.'],
  ['133', 'EOWNERDEAD', 'Previous owner died', 'A mutex was abandoned when its owner process terminated.'],
  ['134', 'EPROTO', 'Protocol error', 'A protocol error occurred.'],
  ['135', 'EPROTONOSUPPORT', 'Protocol not supported', 'The socket protocol is not supported on this machine.'],
  ['136', 'EPROTOTYPE', 'Protocol wrong type for socket', 'The protocol does not support the socket type.'],
  ['137', 'ETIME', 'Timer expired', 'A STREAM ioctl() timed out.'],
  ['138', 'ETIMEDOUT', 'Connection timed out', 'The connection attempt or network operation timed out before it could complete.'],
  ['139', 'ETXTBSY', 'Text file busy', 'An executable file is open for writing.'],
  ['140', 'EWOULDBLOCK', 'Operation would block', 'The socket is in non-blocking mode and the operation would block. Equivalent to EAGAIN for sockets.'],
];

for (const [numeric, symbolic, name, description] of codes) {
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
