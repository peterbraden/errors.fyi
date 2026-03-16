import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'java');
await mkdir(dir, { recursive: true });

const ref = 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/package-summary.html';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "Java Exceptions"
description: "Built-in exception and error classes from the Java standard library (java.lang, java.io, java.net, java.util, java.sql, java.util.concurrent). Checked exceptions must be declared or caught; unchecked exceptions (RuntimeException and Error subclasses) do not."
references:
  - ${ref}
  - https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/package-summary.html
---
`);

// [name, description]
const codes = [
  // java.lang — Errors (unchecked, not normally caught)
  ['StackOverflowError',          'Thrown when the call stack depth exceeds the JVM limit, almost always caused by unbounded recursion. Increase the stack size with -Xss or fix the recursion.'],
  ['OutOfMemoryError',            'Thrown when the JVM cannot allocate memory because the heap is exhausted. Increase -Xmx, fix a memory leak, or reduce allocation pressure.'],
  ['AssertionError',              'Thrown when an assert statement fails. Assertions are disabled by default; enable them with -ea.'],
  ['NoClassDefFoundError',        'Thrown when the JVM cannot find a class at runtime that was present at compile time. Usually indicates a classpath or dependency configuration problem.'],
  ['ExceptionInInitializerError', 'Thrown when a static initializer or static field initializer throws an unchecked exception.'],
  ['ClassFormatError',            'Thrown when the JVM encounters a class file that does not conform to the class file format.'],
  ['UnsatisfiedLinkError',        'Thrown when the JVM cannot find or load a native library (JNI). Ensure the library is on java.library.path.'],
  // java.lang — RuntimeException subclasses (unchecked)
  ['NullPointerException',        'Thrown when the JVM attempts to dereference a null object reference — calling a method, accessing a field, or indexing an array on null. As of Java 14, the message identifies the null variable.'],
  ['ArrayIndexOutOfBoundsException', 'Thrown when an array is accessed with an index that is negative or greater than or equal to the array length.'],
  ['StringIndexOutOfBoundsException', 'Thrown by String and StringBuilder methods when a character index is out of range.'],
  ['IndexOutOfBoundsException',   'The base class for out-of-bounds index exceptions. Thrown directly by List and other java.util collections.'],
  ['ClassCastException',          'Thrown when an object is cast to a type it is not an instance of, e.g. casting an Integer to a String.'],
  ['NumberFormatException',       'Thrown by Integer.parseInt, Double.parseDouble, and similar methods when the string cannot be parsed as the target numeric type.'],
  ['IllegalArgumentException',    'Thrown to indicate that a method has been passed an illegal or inappropriate argument. Use this in your own code to validate parameters.'],
  ['IllegalStateException',       'Thrown when a method is invoked at an inappropriate time relative to the object\'s state, for example calling Iterator.remove() before Iterator.next().'],
  ['UnsupportedOperationException', 'Thrown to indicate that the requested operation is not supported, commonly by unmodifiable collection views returned by Collections.unmodifiableList() and similar.'],
  ['ArithmeticException',         'Thrown for exceptional arithmetic conditions, most commonly integer division or modulo by zero (ArithmeticException: / by zero). Floating-point division by zero yields Infinity, not an exception.'],
  ['NegativeArraySizeException',  'Thrown when code attempts to create an array with a negative size.'],
  ['ArrayStoreException',         'Thrown when an attempt is made to store an object of the wrong type into an array, detected at runtime due to Java\'s covariant array types.'],
  ['ConcurrentModificationException', 'Thrown by iterators when the underlying collection is modified while an iteration is in progress, detected by a fail-fast mechanism. Use CopyOnWriteArrayList or iterate a snapshot instead.'],
  ['NoSuchElementException',      'Thrown by Iterator.next(), Scanner.next(), and similar methods when there are no more elements. Always check hasNext() before calling next().'],
  ['EnumConstantNotPresentException', 'Thrown when an enum constant name passed to Enum.valueOf does not correspond to any constant of the enum type.'],
  ['SecurityException',           'Thrown by the security manager when a requested operation is not permitted.'],
  // java.lang — Checked exceptions
  ['CloneNotSupportedException',  'Thrown by Object.clone() when the class does not implement Cloneable.'],
  ['InterruptedException',        'Thrown when a thread is waiting, sleeping, or otherwise occupied and another thread interrupts it. Always restore the interrupt flag: Thread.currentThread().interrupt().'],
  ['ReflectiveOperationException','The base checked exception for reflective operation failures.'],
  ['ClassNotFoundException',      'Thrown when an application tries to load a class by name (e.g. Class.forName) and the class cannot be found on the classpath.'],
  // java.io — Checked
  ['IOException',                 'The base class for I/O exceptions. Thrown when an I/O operation fails or is interrupted.'],
  ['FileNotFoundException',       'Thrown when a file with the given pathname does not exist or cannot be opened for reading or writing.'],
  ['EOFException',                'Thrown by DataInputStream and ObjectInputStream when the end of a stream is reached unexpectedly.'],
  // java.net — Checked
  ['UnknownHostException',        'Thrown when the IP address of a hostname cannot be resolved by DNS.'],
  ['ConnectException',            'Thrown when a TCP connection is actively refused by the remote host (connection refused).'],
  ['SocketTimeoutException',      'Thrown when a socket read or accept operation times out.'],
  ['SocketException',             'The base class for socket-related exceptions, such as a closed socket or a broken connection.'],
  ['MalformedURLException',       'Thrown when a string cannot be parsed as a valid URL.'],
  ['HttpRetryException',          'Thrown when an HTTP request cannot be retried, for example due to streaming data already being sent.'],
  // javax.net.ssl
  ['SSLHandshakeException',       'Thrown when a TLS/SSL handshake fails, for example due to a certificate verification error, cipher suite mismatch, or expired certificate.'],
  ['SSLException',                'The base class for SSL/TLS errors. Thrown when an SSL operation fails.'],
  // java.sql — Checked
  ['SQLException',                'The base checked exception for database access errors. The getErrorCode() method returns the vendor-specific error code; getSQLState() returns the SQLSTATE value.'],
  ['SQLTimeoutException',         'Thrown when a database operation exceeds the timeout set by Statement.setQueryTimeout().'],
  ['SQLIntegrityConstraintViolationException', 'Thrown when a constraint violation occurs, such as a NOT NULL, UNIQUE, PRIMARY KEY, or FOREIGN KEY violation.'],
  ['SQLSyntaxErrorException',     'Thrown when the SQL statement contains a syntax error or when an object referenced in the statement does not exist.'],
  // java.util — Unchecked
  ['EmptyStackException',         'Thrown by Stack.pop() and Stack.peek() when the stack is empty.'],
  ['MissingFormatArgumentException', 'Thrown by String.format and PrintStream.printf when a format specifier refers to a missing argument.'],
  ['InputMismatchException',      'Thrown by Scanner.nextInt and similar methods when the next token does not match the expected type.'],
  // java.util.concurrent — Checked
  ['ExecutionException',          'Thrown by Future.get() when the computation threw an exception. Unwrap the cause with getCause().'],
  ['TimeoutException',            'Thrown by Future.get(timeout, unit) and BlockingQueue.poll(timeout, unit) when the operation does not complete within the specified time.'],
  // java.lang.reflect
  ['InvocationTargetException',   'A checked exception wrapping an exception thrown by a reflectively invoked method or constructor. Unwrap the underlying exception with getCause().'],
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
