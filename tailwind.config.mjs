/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Cascadia Code',
          'ui-monospace',
          'monospace',
        ],
      },
      colors: {
        // Deep charcoal neutrals
        slate: {
          950: '#0a0f1a',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50:  '#f8fafc',
        },
        // Single accent — a clean electric blue
        accent: {
          DEFAULT: '#2563eb',
          hover:   '#1d4ed8',
          muted:   '#dbeafe',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            a: { color: theme('colors.accent.DEFAULT') },
            'h1,h2,h3,h4': { color: theme('colors.slate.900') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
