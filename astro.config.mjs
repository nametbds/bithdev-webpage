import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// When deploying to GitHub Pages at https://<username>.github.io/<repo>/
// set site to your GitHub Pages URL and base to your repo name.
// When using a custom domain (bithdev.ie), remove `base` and update `site`.
export default defineConfig({
  site: process.env.NODE_ENV === 'production' ? 'https://bithdev.github.io' : undefined,
  base: process.env.NODE_ENV === 'production' ? '/bithdev-site' : '/',
  output: 'static',
  integrations: [tailwind()],
});
