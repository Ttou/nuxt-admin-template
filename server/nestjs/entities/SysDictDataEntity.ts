import type { IYesOrNoEnum } from '#shared/enums'
import { YesOrNoEnumValues } from '#shared/enums'
import { Entity, Enum, Index, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_dict_data' })
@Index({ properties: ['dictType', 'dictValue'] })
export class SysDictDataEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: bigint

  @Property()
  dictLabel!: string

  @Property()
  dictValue!: string

  @Property()
  dictType!: string

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
