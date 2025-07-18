import { createResolver } from '@nuxt/kit'
import { LocaleEnum } from './shared/enums'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'vue-types-nuxt',
  ],
  ssr: false,
  app: {
    head: {
      title: 'Nuxt Admin Template',
    },
  },
  css: [
    'element-plus/dist/index.css',
    'plus-pro-components/index.css',
    '~/assets/css/global.css',
  ],
  alias: {
    '#design': resolve('./design'),
  },
  compatibilityDate: '2025-07-11',
  nitro: {
    imports: {
      dirs: [
        './server/composables/**',
        './server/container/**',
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
  i18n: {
    defaultLocale: LocaleEnum.ZH_CN,
    locales: LocaleEnum.items.map(v => ({
      code: v.value,
      name: v.label,
      file: `${v.value}.ts`,
    })),
  },
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
  vueTypes: {
    shim: true,
  },
})
