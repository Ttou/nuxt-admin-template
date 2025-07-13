import { Enum } from './base'

export const MenuTypeEnum = Enum({
  MENU: { label: '菜单', value: 'C' },
  BUTTON: { label: '按钮', value: 'F' },
  FOLDER: { label: '目录', value: 'M' },
} as const)

export const MenuTypeEnumMap = MenuTypeEnum.toKeyValueMap()

export const MenuTypeEnumValues = MenuTypeEnum.toValues()

export type IMenuTypeEnum = typeof MenuTypeEnum.valueType
