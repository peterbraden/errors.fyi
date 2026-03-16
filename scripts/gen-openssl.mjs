import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'openssl');
await mkdir(dir, { recursive: true });

const ref = 'https://www.openssl.org/docs/man3.0/man3/SSL_get_error.html';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "OpenSSL Error Codes"
description: "Error codes from the OpenSSL TLS/SSL library. Includes SSL_get_error() return values (used to interpret non-blocking I/O results), X.509 certificate verification errors, and TLS alert codes sent between peers."
references:
  - ${ref}
  - https://www.openssl.org/docs/man3.0/man3/X509_STORE_CTX_get_error.html
  - https://www.rfc-editor.org/rfc/rfc8446#section-6
---
`);

// [code, name, description]
const codes = [
  // SSL_get_error() return values — what non-blocking code checks after SSL_read/SSL_write
  ['SSL_ERROR_NONE', 'No error', 'The TLS operation completed successfully. Returned when SSL_get_error() is called after a successful SSL_read() or SSL_write().'],
  ['SSL_ERROR_ZERO_RETURN', 'Connection closed', 'The TLS connection was cleanly shut down by the peer. No more data will be received. Call SSL_shutdown() to complete the close.'],
  ['SSL_ERROR_WANT_READ', 'Want read', 'The operation could not complete because data must first be read from the underlying socket. Call SSL_read() or SSL_write() again when the socket is readable.'],
  ['SSL_ERROR_WANT_WRITE', 'Want write', 'The operation could not complete because data must first be written to the underlying socket. Call SSL_read() or SSL_write() again when the socket is writable.'],
  ['SSL_ERROR_WANT_CONNECT', 'Want connect', 'The underlying connect() has not yet completed. Retry the operation when the socket is writable.'],
  ['SSL_ERROR_WANT_ACCEPT', 'Want accept', 'The underlying accept() has not yet completed. Retry the operation when the socket is readable.'],
  ['SSL_ERROR_SYSCALL', 'System call error', 'A non-recoverable I/O error occurred at the operating system level. Check errno for details. An unexpected EOF from the peer also returns this code.'],
  ['SSL_ERROR_SSL', 'SSL library error', 'A failure occurred in the SSL library itself. Call ERR_get_error() to retrieve the error queue for details.'],
  // X.509 certificate verification errors — returned by SSL_get_verify_result() or X509_STORE_CTX_get_error()
  ['X509_V_ERR_UNABLE_TO_GET_ISSUER_CERT', 'Unable to get issuer certificate', "The certificate's issuer certificate could not be found in the certificate store."],
  ['X509_V_ERR_UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'Unable to verify leaf signature', 'No signatures could be verified because the certificate chain contains only the end entity certificate and it is not self-signed.'],
  ['X509_V_ERR_CERT_CHAIN_TOO_LONG', 'Certificate chain too long', 'The certificate chain length exceeds the maximum depth set in the verification parameters.'],
  ['X509_V_ERR_CERT_REVOKED', 'Certificate revoked', 'The certificate has been revoked according to a Certificate Revocation List (CRL).'],
  ['X509_V_ERR_INVALID_CA', 'Invalid CA certificate', 'A certificate marked as a CA has an invalid CA extension or key usage.'],
  ['X509_V_ERR_CERT_NOT_YET_VALID', 'Certificate not yet valid', 'The certificate is not yet valid: the current time is before the notBefore field.'],
  ['X509_V_ERR_CERT_HAS_EXPIRED', 'Certificate has expired', 'The certificate has expired: the current time is after the notAfter field.'],
  ['X509_V_ERR_ERROR_IN_CERT_NOT_BEFORE_FIELD', 'Invalid notBefore field', 'The certificate contains an invalid notBefore date field that cannot be parsed.'],
  ['X509_V_ERR_ERROR_IN_CERT_NOT_AFTER_FIELD', 'Invalid notAfter field', 'The certificate contains an invalid notAfter date field that cannot be parsed.'],
  ['X509_V_ERR_DEPTH_ZERO_SELF_SIGNED_CERT', 'Self-signed certificate', 'The end entity certificate is self-signed and not in the list of trusted certificates.'],
  ['X509_V_ERR_SELF_SIGNED_CERT_IN_CHAIN', 'Self-signed certificate in chain', 'The certificate chain contains a self-signed root that is not in the trusted certificate store.'],
  ['X509_V_ERR_UNABLE_TO_GET_ISSUER_CERT_LOCALLY', 'Unable to get local issuer certificate', 'The issuer certificate could not be found locally. The certificate chain may be incomplete.'],
  ['X509_V_ERR_UNABLE_TO_GET_CRL', 'Unable to get CRL', 'The Certificate Revocation List could not be retrieved to verify revocation status.'],
  ['X509_V_ERR_CRL_NOT_YET_VALID', 'CRL not yet valid', 'The CRL is not yet valid according to its nextUpdate field.'],
  ['X509_V_ERR_CRL_HAS_EXPIRED', 'CRL has expired', 'The Certificate Revocation List has passed its nextUpdate date and is no longer valid.'],
  ['X509_V_ERR_HOSTNAME_MISMATCH', 'Hostname mismatch', 'The certificate was not issued for the hostname being connected to. The Subject Alternative Names do not include the server hostname.'],
  ['X509_V_ERR_IP_ADDRESS_MISMATCH', 'IP address mismatch', 'The certificate was not issued for the IP address being connected to.'],
  ['X509_V_ERR_INVALID_PURPOSE', 'Invalid certificate purpose', 'The certificate is not valid for the intended purpose (e.g. a CA cert used for TLS server auth).'],
  ['X509_V_ERR_CERT_UNTRUSTED', 'Certificate not trusted', 'The root CA certificate is not marked as trusted for the intended purpose.'],
  ['X509_V_ERR_CERT_REJECTED', 'Certificate rejected', 'The root CA certificate is explicitly marked as rejecting the intended purpose.'],
  ['X509_V_ERR_NO_EXPLICIT_POLICY', 'No explicit policy', 'The requireExplicitPolicy flag is set but the certificate chain has no valid explicit policy.'],
  ['X509_V_ERR_UNHANDLED_CRITICAL_EXTENSION', 'Unhandled critical extension', 'The certificate contains a critical extension that OpenSSL does not recognise or cannot handle.'],
  ['X509_V_ERR_KEYUSAGE_NO_CERTSIGN', 'Key usage no cert sign', 'The issuer certificate Key Usage extension does not allow certificate signing.'],
  ['X509_V_ERR_SIGNATURE_ALGORITHM_MISMATCH', 'Signature algorithm mismatch', 'The algorithm in the signature does not match the algorithm in the certificate.'],
  // TLS alert codes (RFC 8446 §6) — sent between TLS peers to indicate errors
  ['TLS_close_notify', 'Close notify', 'The sender will send no more data. Both peers must send close_notify before closing the TCP connection.'],
  ['TLS_unexpected_message', 'Unexpected message', 'An unexpected or inappropriate TLS handshake message was received.'],
  ['TLS_bad_record_mac', 'Bad record MAC', 'A record with an incorrect MAC or padding was received, indicating data corruption or a decryption failure.'],
  ['TLS_decryption_failed_RESERVED', 'Decryption failed (reserved)', 'Decryption failed. This alert is reserved and must not be sent in TLS 1.2 and later because it can reveal timing information.'],
  ['TLS_record_overflow', 'Record overflow', 'A TLS record was received whose payload exceeds 2^14 + 256 bytes.'],
  ['TLS_handshake_failure', 'Handshake failure', 'The sender was unable to negotiate acceptable security parameters from the available options.'],
  ['TLS_bad_certificate', 'Bad certificate', 'The certificate is corrupt or contains invalid signatures.'],
  ['TLS_unsupported_certificate', 'Unsupported certificate', 'The certificate is of an unsupported type.'],
  ['TLS_certificate_revoked', 'Certificate revoked', 'The certificate was revoked by the signer.'],
  ['TLS_certificate_expired', 'Certificate expired', 'The certificate has expired or is not currently valid.'],
  ['TLS_certificate_unknown', 'Certificate unknown', 'An unspecified issue arose in processing the certificate, making it unacceptable.'],
  ['TLS_illegal_parameter', 'Illegal parameter', 'A field in the handshake was incorrect or inconsistent with other fields.'],
  ['TLS_unknown_ca', 'Unknown CA', 'A valid certificate chain was received but the CA certificate could not be located or matched to a known trusted CA.'],
  ['TLS_access_denied', 'Access denied', 'A valid certificate was received but access control denied the negotiation.'],
  ['TLS_decode_error', 'Decode error', 'A message could not be decoded because some field was out of range or the length was incorrect.'],
  ['TLS_decrypt_error', 'Decrypt error', 'A handshake cryptographic operation failed, such as a failed signature verification or key exchange failure.'],
  ['TLS_protocol_version', 'Protocol version', 'The TLS version the client offered is not supported by the server.'],
  ['TLS_insufficient_security', 'Insufficient security', 'The cipher suites offered by the client do not meet the security requirements of the server.'],
  ['TLS_internal_error', 'Internal error', 'An internal error unrelated to the peer or the protocol occurred, making it impossible to continue.'],
  ['TLS_inappropriate_fallback', 'Inappropriate fallback', 'The server detected a fallback connection attempted by the client that is below the server minimum. Sent in response to TLS_FALLBACK_SCSV.'],
  ['TLS_user_canceled', 'User cancelled', 'The handshake was cancelled by the user, typically because the user explicitly terminated the connection.'],
  ['TLS_missing_extension', 'Missing extension', 'A required TLS extension was absent from the handshake message.'],
  ['TLS_unsupported_extension', 'Unsupported extension', 'A TLS extension was received that is not valid for the current handshake type.'],
  ['TLS_unrecognized_name', 'Unrecognised name', 'The server name in the SNI extension is not served by this server.'],
  ['TLS_bad_certificate_status_response', 'Bad certificate status response', 'An invalid or unacceptable certificate status (OCSP) response was received.'],
  ['TLS_certificate_required', 'Certificate required', 'A certificate is required from the client, but none was provided.'],
  ['TLS_no_application_protocol', 'No application protocol', 'None of the application protocols offered by the client (ALPN) are supported by the server.'],
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
