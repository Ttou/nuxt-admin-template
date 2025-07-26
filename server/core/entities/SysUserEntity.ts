import type { IYesOrNoEnum } from '#shared/enums'
import { YesOrNoEnumValues } from '#shared/enums'
import { Collection, Entity, Enum, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'sys_user' })
export class SysUserEntity {
  @PrimaryKey({ type: 'bigint', autoincrement: true })
  id!: bigint

  @Property({ unique: true })
  userName!: string

  @Property()
  nickName!: string

  @Property()
  password!: string

  @Property({ nullable: true })
  email?: string

  @Property({ nullable: true })
  phone?: string

  @Property({ nullable: true })
  sex?: string

  @Property({ nullable: true })
  avatar?: string

  @Enum({ items: () => YesOrNoEnumValues })
  isAvailable!: IYesOrNoEnum

  @Enum({ items: () => YesOrNoEnumValues })
  isDelete!: IYesOrNoEnum

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

  @ManyToMany(() => SysDeptEntity, 'users', { owner: true, ref: true, pivotTable: 'rel_user_dept', joinColumn: 'user_id', inverseJoinColumn: 'dept_id' })
  depts = new Collection<SysDeptEntity>(this)

  @ManyToMany(() => SysPostEntity, 'users', { owner: true, ref: true, pivotTable: 'rel_user_post', joinColumn: 'user_id', inverseJoinColumn: 'post_id' })
  posts = new Collection<SysPostEntity>(this)

  @ManyToMany(() => SysRoleEntity, 'users', { owner: true, ref: true, pivotTable: 'rel_user_role', joinColumn: 'user_id', inverseJoinColumn: 'role_id' })
  roles = new Collection<SysRoleEntity>(this)
}
