import type { ILocaleEnum } from '#shared/enums'
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_trans' })
export class SysTransEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: bigint

  @Property({ unique: true })
  transKey!: string

  @Property({ type: 'json', nullable: true })
  transValue?: { [key in ILocaleEnum]?: string }

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
