import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'
import plusEn from 'plus-pro-components/es/locale/lang/en'

import { LocaleEnum } from '#shared/enums'

const localeMap = {
  [LocaleEnum.ZH_CN]: {
    ...zhCn,
    ...plusZhCn,
  },
  [LocaleEnum.EN_US]: {
    ...en,
    ...plusEn,
  },
}

export function useLocale() {
  const mainStore = useMainStore()

  return computed(() => localeMap[mainStore.locale])
}
