import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'data', 'docker');
await mkdir(dir, { recursive: true });

const ref = 'https://docs.docker.com/engine/reference/run/#exit-status';

const write = (file, content) => writeFile(join(dir, file), content);

await write('_index.md', `---
title: "Docker Container Exit Codes"
description: "Exit codes returned by Docker containers and the Docker CLI. Codes 0–125 come from the container process itself; codes 125–127 indicate Docker-level errors; codes 128+N indicate the container was killed by Unix signal N."
references:
  - ${ref}
  - https://docs.docker.com/engine/reference/commandline/run/
---
`);

// [code, name, description]
const codes = [
  ['0',   'Clean exit',               'The container process exited successfully with no error.'],
  ['1',   'Application error',        'The container process exited with a generic application error. The specific cause is logged to the container\'s stdout/stderr.'],
  ['125', 'Docker daemon error',       'The docker run command itself failed. This typically means the Docker daemon could not create or start the container — for example, an invalid flag was passed to docker run or the image could not be pulled.'],
  ['126', 'Command cannot be invoked', 'The container was created but the specified command could not be invoked, usually because the binary lacks execute permission.'],
  ['127', 'Command not found',         'The container was created but the specified command or entrypoint was not found inside the image. Check that the binary exists at the expected path.'],
  ['128', 'Invalid exit argument',     'The application called exit() with an invalid argument. Exit codes must be integers in the range 0–255.'],
  ['130', 'Terminated by SIGINT',      'The container was terminated by SIGINT (signal 2), typically by pressing Ctrl+C in an attached terminal session.'],
  ['134', 'Aborted (SIGABRT)',         'The container process aborted itself, usually due to a failed assertion or an explicit abort() call.'],
  ['137', 'Terminated by SIGKILL',     'The container was killed with SIGKILL (signal 9). Common causes: docker stop (after the stop timeout), docker kill, the Linux OOM killer terminating the container due to memory pressure, or a Kubernetes pod eviction.'],
  ['139', 'Segmentation fault (SIGSEGV)', 'The container process accessed memory it was not permitted to access. This is almost always a bug in the application or a corrupted binary.'],
  ['143', 'Terminated by SIGTERM',     'The container received SIGTERM (signal 15) and exited cleanly. This is the normal shutdown signal sent by docker stop before the kill timeout.'],
  ['255', 'Exit status out of range',  'The container exited with status 255, often indicating an error in the entrypoint script or that the container was terminated by an out-of-range signal.'],
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
