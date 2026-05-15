import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://errors.fyi',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    resolve: {
      alias: {
        'node:fs/promises': fileURLToPath(new URL('./src/lib/fs-limited.js', import.meta.url)),
      },
    },
    ssr: {
      noExternal: [],
    },
  },
});
