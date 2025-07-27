import { FindSystemConfigPageDto } from '#shared/dtos'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.config.findPage'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(FindSystemConfigPageDto))
    const em = useEM()

    const [data, total] = await em.findAndCount(SysConfigEntity, {
      $and: [
        { configName: dto.configName ? { $like: `%${dto.configName}%` } : {} },
        { configKey: dto.configKey ? { $like: `%${dto.configKey}%` } : {} },
        { isBuiltin: dto.isBuiltin ? { $eq: dto.isBuiltin } : {} },
        { createdAt: dto.createBeginTime ? { $gte: dto.createBeginTime, $lte: dto.createEndTime } : {} },
      ],
    }, {
      limit: dto.pageSize,
      offset: dto.page - 1,
    })

    return {
      page: dto.page,
      pageSize: dto.pageSize,
      data,
      total,
    }
  },
})
