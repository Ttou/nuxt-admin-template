import { FindSystemDictTypePageDto } from '#shared/dtos'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.dictType.findPage'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(FindSystemDictTypePageDto))
    const em = useEM()

    const [data, total] = await em.findAndCount(SysDictTypeEntity, {
      $and: [
        { dictName: dto.dictName ? { $like: `%${dto.dictName}%` } : {} },
        { dictType: dto.dictType ? { $like: `%${dto.dictType}%` } : {} },
        { isAvailable: dto.isAvailable ? { $eq: dto.isAvailable } : {} },
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
