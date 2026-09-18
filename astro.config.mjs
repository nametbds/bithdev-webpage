import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.NODE_ENV === 'production' ? 'https://nametbds.github.io' : undefined,
  base: process.env.NODE_ENV === 'production' ? '/bithdev-webpage' : '/',
  output: 'static',
  integrations: [tailwind()],
});
