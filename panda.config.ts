import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./web/app.{js,jsx,ts,tsx}', './web/components/**/*.{js,jsx,ts,tsx}', './web/layouts/**/*.{js,jsx,ts,tsx}', './web/pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled',
})
