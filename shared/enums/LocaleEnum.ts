import { Enum } from './base'

export const LocaleEnum = Enum({
  ZH_CN: { label: '简体中文', value: 'zh-CN' },
  EN_US: { label: 'English', value: 'en-US' },
})

export const LocaleEnumMap = LocaleEnum.toKeyValueMap()

export const LocaleEnumValues = LocaleEnum.toValues()

export type ILocaleEnum = typeof LocaleEnum.valueType
