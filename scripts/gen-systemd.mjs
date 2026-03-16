import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'systemd');
await mkdir(dir, { recursive: true });

const ref = 'https://www.freedesktop.org/software/systemd/man/systemd.exec.html';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "systemd Service Exit Codes"
description: "Exit status codes used by systemd when a service process fails to start or exits abnormally. Codes 200–243 are systemd-specific and indicate which setup step failed before exec. Standard codes (0, 1) follow POSIX conventions."
references:
  - ${ref}
  - https://www.freedesktop.org/software/systemd/man/systemd.service.html
---
`);

// [code, name, description]
const codes = [
  // Standard
  ['0', 'Success', 'The service process exited successfully.'],
  ['1', 'Failure', 'The service process exited with a generic failure code.'],
  // systemd-specific pre-exec failures (200–243)
  // These are returned by the systemd executor stub when setup fails before exec.
  ['200', 'ENVIRONMENT', 'Failed to set up the execution environment, such as applying EnvironmentFile= or Environment= directives.'],
  ['201', 'GETATTR', 'Failed to retrieve file attributes needed for privilege or security setup.'],
  ['202', 'CHDIR', 'Failed to change to the WorkingDirectory= specified in the unit file.'],
  ['203', 'EXEC', 'The executable could not be executed. It may be missing, not executable, or the interpreter was not found.'],
  ['204', 'MEMORY', 'Failed to set up memory-related resource limits (e.g. MemoryLimit=).'],
  ['205', 'LIMITS', 'Failed to apply resource limits (LimitCPU=, LimitNOFILE=, etc.) via setrlimit().'],
  ['206', 'OOM_ADJUST', 'Failed to set the OOM killer score adjustment (OOMScoreAdjust=).'],
  ['207', 'SIGNAL_MASK', 'Failed to reset the signal mask or configure signal handlers before exec.'],
  ['208', 'STDIN', 'Failed to set up standard input as specified by StandardInput=.'],
  ['209', 'STDOUT', 'Failed to set up standard output as specified by StandardOutput=.'],
  ['210', 'CHOWN', 'Failed to change ownership of the runtime directory or other file-system objects.'],
  ['211', 'SETSID', 'Failed to create a new session via setsid().'],
  ['212', 'SETPGID', 'Failed to set the process group ID.'],
  ['213', 'EXEC_FORMAT_ERROR', 'The executable has an unrecognised binary format (ELF mismatch or missing interpreter).'],
  ['214', 'CHROOT', 'Failed to change the root directory (RootDirectory= or RootImage=).'],
  ['215', 'CAPABILITIES', 'Failed to apply capability settings (CapabilityBoundingSet=, AmbientCapabilities=, etc.).'],
  ['216', 'GROUP', 'Failed to set the supplementary group list or GID (Group= or SupplementaryGroups=).'],
  ['217', 'USER', 'Failed to set the user identity (User=).'],
  ['218', 'SYMLINKS', 'Failed to set up bind mounts or symlinks in the unit namespace.'],
  ['219', 'CGROUP', 'Failed to set up the cgroup for the service.'],
  ['220', 'SCHED', 'Failed to apply CPU scheduling settings (CPUSchedulingPolicy=, CPUSchedulingPriority=).'],
  ['221', 'MOUNT', 'Failed to set up mount namespacing (PrivateTmp=, ReadOnlyPaths=, BindPaths=, etc.).'],
  ['222', 'SMACK_PROCESS_LABEL', 'Failed to set the SMACK process label.'],
  ['223', 'KEYRING', 'Failed to set up or join the kernel keyring (KeyringMode=).'],
  ['224', 'STATE_DIRECTORY', 'Failed to create or set up StateDirectory= paths.'],
  ['225', 'RUNTIME_DIRECTORY', 'Failed to create or set up RuntimeDirectory= paths.'],
  ['226', 'PROC_EXEC_BINARY', 'Failed to set up an executable in /proc (used internally during namespace setup).'],
  ['227', 'CREDENTIALS', 'Failed to set up credentials (LoadCredential=, SetCredential=, etc.).'],
  ['228', 'CONFIGURATION_DIRECTORY', 'Failed to create or set up ConfigurationDirectory= paths.'],
  ['229', 'NUMA_POLICY', 'Failed to apply the NUMA memory policy (NUMAPolicy=, NUMAMask=).'],
  ['230', 'EXEC_DIRECTORY', 'Failed to create or set up ExecPaths= or ExecStartPre= temporary directories.'],
  ['231', 'PROTECT_HOME', 'Failed to apply ProtectHome= restrictions.'],
  ['232', 'NAMESPACE', 'Failed to unshare or set up a new namespace (PrivateNetwork=, PrivatePIDs=, etc.).'],
  ['233', 'NO_NEW_PRIVILEGES', 'Failed to set the no-new-privileges flag (NoNewPrivileges=).'],
  ['234', 'SECCOMP', 'Failed to apply the seccomp filter (SystemCallFilter=).'],
  ['235', 'SELINUX_CONTEXT', 'Failed to set the SELinux security context (SELinuxContext=).'],
  ['236', 'PERSONALITY', 'Failed to set the execution domain personality (Personality=).'],
  ['237', 'APPARMOR_PROFILE', 'Failed to apply the AppArmor profile (AppArmorProfile=).'],
  ['238', 'ADDRESS_FAMILIES', 'Failed to apply address family restrictions (RestrictAddressFamilies=).'],
  ['239', 'RUNTIME_DIRECTORY_PRESERVE', 'Failed to preserve or clean up the runtime directory on service stop.'],
  ['240', 'MAKE_SLICE', 'Failed to create the cgroup slice for the service.'],
  ['241', 'BPFPROG', 'Failed to attach a BPF program (IPAddressAllow=, IPAddressDeny=, BPFProgram=).'],
  ['242', 'NETWORK_NAMESPACE', 'Failed to set up a private network namespace (PrivateNetwork=).'],
  ['243', 'RUNTIME_BIND_MOUNT', 'Failed to set up bind mounts for the runtime directory.'],
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
