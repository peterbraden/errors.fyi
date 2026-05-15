// Concurrency-limited wrapper for fs/promises to avoid EMFILE errors.
// Uses fs.promises (via CommonJS fs module) to bypass the Vite alias on node:fs/promises.
import { createRequire } from 'node:module';
const _require = createRequire(import.meta.url);
const fsp = _require('fs').promises;

let running = 0;
const queue = [];
const LIMIT = 64;

function tick() {
  while (queue.length > 0 && running < LIMIT) {
    running++;
    queue.shift()();
  }
}

function limited(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const run = () => {
        fn.apply(fsp, args).then(
          (result) => { running--; resolve(result); tick(); },
          (err) => { running--; reject(err); tick(); }
        );
      };
      queue.push(run);
      tick();
    });
  };
}

export const readFile = limited(fsp.readFile.bind(fsp));
export const writeFile = fsp.writeFile.bind(fsp);
export const readdir = limited(fsp.readdir.bind(fsp));
export const mkdir = fsp.mkdir.bind(fsp);
export const rm = fsp.rm.bind(fsp);
export const stat = limited(fsp.stat.bind(fsp));
export const lstat = limited(fsp.lstat.bind(fsp));
export const access = limited(fsp.access.bind(fsp));
export const unlink = fsp.unlink.bind(fsp);
export const rename = fsp.rename.bind(fsp);
export const copyFile = fsp.copyFile.bind(fsp);
export const open = limited(fsp.open.bind(fsp));
export const opendir = limited(fsp.opendir.bind(fsp));
export const appendFile = fsp.appendFile.bind(fsp);
export const chmod = fsp.chmod.bind(fsp);
export const chown = fsp.chown.bind(fsp);
export const utimes = fsp.utimes.bind(fsp);
export const symlink = fsp.symlink.bind(fsp);
export const link = fsp.link.bind(fsp);
export const readlink = fsp.readlink.bind(fsp);
export const realpath = fsp.realpath.bind(fsp);
export const mkdtemp = fsp.mkdtemp.bind(fsp);
export const watch = fsp.watch ? fsp.watch.bind(fsp) : undefined;
export const truncate = fsp.truncate.bind(fsp);

export default fsp;
