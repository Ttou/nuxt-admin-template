import { defineStore } from 'pinia'
import { LocaleEnum } from '#shared/enums'
import type { ILocaleEnum } from '#shared/enums'

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
