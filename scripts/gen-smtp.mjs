import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'smtp');
await mkdir(dir, { recursive: true });

const ref = 'https://www.rfc-editor.org/rfc/rfc5321';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "SMTP Reply Codes"
description: "Three-digit reply codes returned by SMTP servers (RFC 5321). The first digit indicates success (2xx), transient failure (4xx), or permanent failure (5xx). The second digit categorises the response; the third gives detail."
references:
  - ${ref}
  - https://www.rfc-editor.org/rfc/rfc2034
  - https://www.rfc-editor.org/rfc/rfc4954
---
`);

// [code, name, description]
const codes = [
  // 2xx — Success
  ['211', 'System status', 'A status report or system help reply. Typically returned in response to a HELP command or NOOP.'],
  ['214', 'Help message', 'A response to a HELP command listing supported commands or providing usage information.'],
  ['220', 'Service ready', 'The server is ready to accept connections. Sent immediately after the TCP connection is established.'],
  ['221', 'Service closing', 'The server is closing the transmission channel. Sent in response to a QUIT command.'],
  ['235', 'Authentication successful', 'SMTP AUTH succeeded. The server has accepted the client credentials and the session is authenticated.'],
  ['250', 'Requested mail action OK', 'The requested action was completed successfully. Returned after EHLO, MAIL FROM, RCPT TO, and DATA (after the message body is accepted).'],
  ['251', 'User not local; will forward', 'The recipient is not hosted locally but the server will forward the message to the address given in the response.'],
  ['252', 'Cannot verify user, will attempt delivery', 'The server cannot verify the recipient exists (VRFY is not supported or the user is unverifiable), but will attempt delivery anyway.'],
  // 3xx — Positive intermediate
  ['334', 'Server AUTH challenge', 'An intermediate response during SMTP AUTH containing a Base64-encoded challenge that the client must respond to.'],
  ['354', 'Start mail input', 'Returned after the DATA command. The client should now send the message body, terminated by a line containing only a period.'],
  // 4xx — Transient negative (may be retried)
  ['421', 'Service not available', 'The server is temporarily unavailable and is closing the connection. The client should retry later.'],
  ['422', 'Mailbox full', 'The recipient mailbox has exceeded its storage quota. The message may be retried later if the mailbox is cleared.'],
  ['431', 'Not enough disk space', 'Insufficient disk space on the server. The client should retry after a delay.'],
  ['432', 'Recipient incoming mail queue paused', 'The recipient\'s incoming mail queue has been temporarily suspended. Retry later.'],
  ['450', 'Mailbox unavailable', 'The requested mailbox action was not taken because it is temporarily unavailable. Retry later.'],
  ['451', 'Local error in processing', 'The server encountered a local error and could not complete the action. Retry after a delay.'],
  ['452', 'Insufficient system storage', 'The server does not have enough storage space to accept the message right now. Retry later.'],
  ['454', 'TLS not available', 'The server cannot begin a TLS negotiation (STARTTLS) at this time. The client may retry the command or use a different security mechanism.'],
  ['455', 'Server unable to accommodate parameters', 'The server cannot accept the MAIL or RCPT parameters at this time. Retry after a delay.'],
  // 5xx — Permanent negative (do not retry)
  ['500', 'Syntax error, command unrecognised', 'The server could not recognise the command. The command line may be too long or contain invalid characters.'],
  ['501', 'Syntax error in parameters', 'The command was recognised but its arguments are syntactically incorrect.'],
  ['502', 'Command not implemented', 'The server does not implement the command.'],
  ['503', 'Bad sequence of commands', 'The command was issued in an incorrect order. For example, DATA before MAIL FROM, or RCPT TO before MAIL FROM.'],
  ['504', 'Command parameter not implemented', 'A parameter of the command is not implemented by the server, for example an unsupported AUTH mechanism.'],
  ['521', 'Domain does not accept mail', 'The server does not accept mail for this domain. The connection should be terminated.'],
  ['523', 'Encryption required', 'The message was rejected because it exceeds the server\'s size limit or because encryption is required.'],
  ['530', 'Authentication required', 'The server requires SMTP AUTH before accepting commands. The client must authenticate first.'],
  ['534', 'Authentication mechanism too weak', 'The server will not accept the requested authentication mechanism. A stronger mechanism is required.'],
  ['535', 'Authentication credentials invalid', 'SMTP AUTH failed. The username or password is incorrect, or the account is locked.'],
  ['538', 'Encryption required for authentication', 'The selected authentication mechanism is only available when the session is encrypted with STARTTLS.'],
  ['541', 'Recipient address rejected', 'The recipient address was rejected due to policy, such as an access control list or spam filtering.'],
  ['550', 'Mailbox unavailable', 'The recipient mailbox does not exist or the server policy rejects mail to it. Do not retry; bounce the message to the sender.'],
  ['551', 'User not local', 'The recipient is not local and the server will not forward mail. The response may include the correct address to try.'],
  ['552', 'Exceeded storage allocation', 'The recipient\'s mailbox has exceeded its storage limit and cannot accept new messages.'],
  ['553', 'Mailbox name not allowed', 'The recipient address syntax is invalid or the address is not permitted on this server.'],
  ['554', 'Transaction failed', 'The transaction failed. A generic permanent failure code; the message text usually gives more detail. Often indicates the message was rejected as spam.'],
  ['555', 'MAIL FROM or RCPT TO parameters not recognised', 'The server does not recognise or support the extension parameters supplied with MAIL FROM or RCPT TO.'],
  ['556', 'Domain does not accept mail', 'The domain indicated by the RCPT TO address has a null MX record, meaning it explicitly declares that it does not accept email.'],
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
