import { Enum } from './base'

export const LocaleEnum = Enum({
  ZH_CN: { label: '中文', value: 'zh-cn' },
  EN_US: { label: 'English', value: 'en-us' },
})

export type ILocaleEnum = typeof LocaleEnum.valueType
