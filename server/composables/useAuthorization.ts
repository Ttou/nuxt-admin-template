import type { _RequestMiddleware } from 'h3'
import { HttpStatus } from '@nestjs/common'

export function useAuthorization(permission: string): _RequestMiddleware {
  return async function () {
    const em = useEM()
    const currentUser = useCurrentUser()

    const user = await em.findOne(SysUserEntity, {
      $and: [
        { id: { $eq: currentUser.id } },
        { roles: { menus: { menuKey: { $eq: permission } } } },
      ],
    })

    if (!user) {
      throw createError({
        status: HttpStatus.FORBIDDEN,
        message: '没有权限访问',
      })
    }
  }
}
