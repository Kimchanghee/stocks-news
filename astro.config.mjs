import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://stockmarketnews.online',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  devToolbar: { enabled: false },
});
