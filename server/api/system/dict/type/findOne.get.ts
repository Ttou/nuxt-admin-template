import { FindSystemDictOneDto } from '#shared/dtos'
import { YesOrNoEnum } from '#shared/enums'

export default defineLazyEventHandler(() => {
  const { useCacheRequest, useCacheResponse } = defineCacheMiddleware({
    key: 'sys_dict',
    ttl: 60 * 60 * 24,
    cb: opts => `${opts.key}:${getQuery(opts.event).dictType}`,
  })

  return defineEventHandler({
    onRequest: [
      useAuthentication(),
      useCacheRequest(),
    ],
    onBeforeResponse: [
      useCacheResponse(),
    ],
    handler: async () => {
      const event = useEvent()
      const dto = await getValidatedQuery(event, validateParse(FindSystemDictOneDto))
      const em = useEM()

      const data = await em.findAll(SysDictDataEntity, {
        where: {
          dictType: { $eq: dto.dictType },
          isAvailable: { $eq: YesOrNoEnum.YES },
        },
      })

      return data
    },
  })
})
