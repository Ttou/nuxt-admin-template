import type { _RequestMiddleware } from 'h3'
import { HttpStatus } from '@nestjs/common'

export function useAuthentication(): _RequestMiddleware {
  return async function () {
    const event = useEvent()
    const token = useToken()

    try {
      const isLogout = await nestApp.get(LogoutService).verify(token)

      if (isLogout) {
        throw createError({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Token 已过期',
        })
      }

      const payload = await nestApp.get(JwtService).verify(token)

      const em = useEM()
      const user = await em.findOne(SysUserEntity, {
        id: { $eq: payload.sub },
      })

      if (!user) {
        throw createError({
          status: HttpStatus.UNAUTHORIZED,
          message: '用户不存在',
        })
      }

      event.context.currentUser = user
    }
    catch (error) {
      throw createError({
        status: HttpStatus.UNAUTHORIZED,
        message: error.message,
      })
    }
  }
}
