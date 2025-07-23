import type { IYesOrNoEnum } from '#shared/enums'
import { YesOrNoEnumValues } from '#shared/enums'
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_config' })
export class SysConfigEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: bigint

  @Property()
  configName!: string

  @Property({ unique: true })
  configKey!: string

  @Property()
  configValue!: string

  @Enum({ items: () => YesOrNoEnumValues })
  isBuiltin!: IYesOrNoEnum

  @Enum({ items: () => YesOrNoEnumValues })
  isAvailable!: IYesOrNoEnum

  @Property({ nullable: true })
  remark?: string

  @Property({ nullable: true })
  createBy?: string

  @Property()
  createdAt? = new Date()

  @Property({ nullable: true })
  updateBy?: string

  @Property({ onUpdate: () => new Date() })
  updatedAt? = new Date()
}
