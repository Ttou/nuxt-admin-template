import { FindSystemConfigOneDto } from '#shared/dtos'
import { HttpStatus } from '@nestjs/common'

export default defineLazyEventHandler(() => {
  const { useCacheRequest, useCacheResponse } = defineCacheMiddleware({
    key: 'sys_config',
    ttl: 60 * 60 * 24,
    cb: opts => `${opts.key}:${getQuery(opts.event).configKey}`,
  })

  return defineEventHandler({
    onRequest: [
      useAuthentication(),
      useCacheRequest(),
    ],
    onBeforeResponse: [useCacheResponse()],
    handler: async () => {
      const event = useEvent()
      const dto = await getValidatedQuery(event, validateParse(FindSystemConfigOneDto))
      const em = useEM()

      const oldRecord = await em.findOne(SysConfigEntity, {
        configKey: { $eq: dto.configKey },
      })

      if (!oldRecord) {
        throw createError({
          status: HttpStatus.NOT_FOUND,
          message: `配置标识 ${dto.configKey} 不存在`,
        })
      }

      return oldRecord
    },
  })
})
