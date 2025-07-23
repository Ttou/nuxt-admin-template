import { readFile, writeFile } from 'node:fs/promises'
import { createResolver } from '@nuxt/kit'
import { Oxc } from 'unplugin-oxc'
import { LocaleEnum } from './shared/enums'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
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
    design: resolve('./design'),
  },
  compatibilityDate: '2025-07-11',
  hooks: {
    'prepare:types': async () => {
      const pkgPath = 'node_modules/tslib/package.json'

      const pkgFile = await readFile(pkgPath, { encoding: 'utf-8' })
      const pkgData = JSON.parse(pkgFile)

      delete pkgData.exports['.'].import.node

      await writeFile(pkgPath, JSON.stringify(pkgData, null, 2))
    },
  },
  nitro: {
    imports: {
      dirs: [
        './server/composables/**',
        './server/nestjs/**',
      ],
    },
    experimental: {
      asyncContext: true,
      tasks: true,
    },
    rollupConfig: {
      plugins: [
        {
          name: 'disable-plugins',
          options(options) {
            // @ts-ignore
            options.plugins = options.plugins.filter(v => !['esbuild'].includes(v.name))

            return options
          },
        },
        Oxc.rollup({
          resolve: false,
          sourcemap: true,
          transform: {
            decorator: {
              legacy: true,
              emitDecoratorMetadata: true,
            },
          },
        }),
      ],
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
      standalone: false,
    },
  },
  i18n: {
    defaultLocale: LocaleEnum.ZH_CN,
    locales: LocaleEnum.items.map(v => ({
      code: v.value,
      name: v.label,
      file: `${v.value}.ts`,
    })),
    experimental: {
      localeDetector: 'localeDetector.ts',
    },
  },
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
  vueTypes: {
    shim: true,
  },
})
