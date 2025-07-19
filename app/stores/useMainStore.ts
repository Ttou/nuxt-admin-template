import type { ILocaleEnum } from '#shared/enums'
import { pick } from 'es-toolkit'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const { locale, messages, setLocale } = useI18n()

  const elLocale = computed(() => {
    return pick(messages.value[locale.value], ['name', 'el', 'plus'])
  })

  function changeLocale(value: ILocaleEnum) {
    setLocale(value)
  }

  return {
    locale,
    elLocale,
    changeLocale,
  }
}, {
  persist: {
    pick: [],
    storage: piniaPluginPersistedstate.localStorage(),
  },
})
