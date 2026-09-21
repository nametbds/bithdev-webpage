import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://nametbds.github.io/bithdev-webpage',
  base: '/bithdev-webpage',
  output: 'static',
  integrations: [tailwind()],
});