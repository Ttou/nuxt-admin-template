/// <reference types="../../node_modules/pinia-plugin-persistedstate/dist/index.d.ts" />

import type { ILocaleEnum } from '#shared/enums'
import { LocaleEnum } from '#shared/enums'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const token = ref('')
  const locale = ref<ILocaleEnum>(LocaleEnum.ZH_CN)

  function changeLocale(value: ILocaleEnum) {
    locale.value = value
  }

  return {
    token,
    locale,
    changeLocale,
  }
}, {
  persist: {
    pick: ['token', 'locale'],
    storage: piniaPluginPersistedstate.localStorage(),
  },
})
