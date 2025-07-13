import { Enum } from './base'

export const YesOrNoEnum = Enum({
  NO: { label: '否', value: '0' },
  YES: { label: '是', value: '1' },
} as const)

export const YesOrNoEnumMap = YesOrNoEnum.toKeyValueMap()

export const YesOrNoEnumValues = YesOrNoEnum.toValues()

export type IYesOrNoEnum = typeof YesOrNoEnum.valueType
