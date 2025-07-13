import { EntitySchema } from '@mikro-orm/core'
import { YesOrNoEnumValues } from '#shared/enums'
import type { IYesOrNoEnum } from '#shared/enums'

export class SysConfigEntity {
  id!: bigint

  configName!: string

  configKey!: string

  configValue!: string

  isBuiltin!: IYesOrNoEnum

  isAvailable!: IYesOrNoEnum

  remark?: string

  createdBy?: string

  createdAt?: Date = new Date()

  updatedBy?: string

  updatedAt?: Date = new Date()
}

export const SysConfigEntitySchema = new EntitySchema({
  class: SysConfigEntity,
  tableName: 'sys_config',
  properties: {
    id: { type: 'bigint', primary: true, autoincrement: true },
    configName: { type: 'string', nullable: false },
    configKey: { type: 'string', nullable: false, unique: true },
    configValue: { type: 'string', nullable: false },
    isBuiltin: { enum: true, items: () => YesOrNoEnumValues },
    isAvailable: { enum: true, items: () => YesOrNoEnumValues },
    remark: { type: 'string', nullable: true },
    createdBy: { type: 'string', nullable: true },
    updatedBy: { type: 'string', nullable: true },
    createdAt: { type: 'date', nullable: true },
    updatedAt: { type: 'date', nullable: true, onUpdate: () => new Date() },
  },
})
