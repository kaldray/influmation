import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'
import neutral from '@park-ui/panda-preset/colors/neutral'
import sand from '@park-ui/panda-preset/colors/sand'

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    '@pandacss/preset-panda',
    createPreset({ accentColor: sand, grayColor: neutral, radius: 'sm' }),
  ],
  // Where to look for your css declarations
  include: [
    './inertia/pages/**/*.{ts,tsx}',
    './inertia/src/components/**/*.{ts,tsx}',
    './inertia/src/components/*.{ts,tsx}',
  ],

  // Files to exclude
  exclude: [],
  jsxFramework: 'react',

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
