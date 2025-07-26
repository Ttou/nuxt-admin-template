import type { IYesOrNoEnum } from '#shared/enums'
import { YesOrNoEnumValues } from '#shared/enums'
import { Collection, Entity, Enum, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_dept' })
export class SysDeptEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: bigint

  @Property({ type: 'bigint', nullable: true })
  parentId?: bigint

  @Property()
  deptName!: string

  @Property({ unique: true })
  deptKey!: string

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

  @ManyToMany(() => SysRoleEntity, role => role.depts)
  roles = new Collection<SysRoleEntity>(this)

  @ManyToMany(() => SysUserEntity, user => user.depts)
  users = new Collection<SysUserEntity>(this)
}
