import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@element-plus/nuxt',
    'vue-types-nuxt',
  ],
  css: [
    'element-plus/dist/index.css',
    'plus-pro-components/index.css',
    '@/assets/styles/global.css',
  ],
  alias: {
    design: resolve('./design'),
  },
  compatibilityDate: '2025-07-11',
  nitro: {
    imports: {
      dirs: [
        './server/composables/**/*',
        './server/container/**/*',
      ],
    },
    experimental: {
      asyncContext: true,
      tasks: true,
    },
  },
  postcss: {
    plugins: {
      '@pandacss/dev/postcss': {},
    },
  },
  elementPlus: {
    importStyle: false,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  vueTypes: {
    shim: true,
  },
})
