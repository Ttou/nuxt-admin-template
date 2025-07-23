import { PrimaryKey, Property } from '@mikro-orm/core'

/**
 * 这个实体是为了新增时复制使用的，不要继承，因为继承会导致列的顺序不正确
 */
export class BaseEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: bigint

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
