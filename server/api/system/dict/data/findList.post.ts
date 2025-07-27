import { FindSystemDictDataListDto } from '#shared/dtos'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.dictData.findList'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(FindSystemDictDataListDto))
    const em = useEM()

    const data = await em.findAll(SysDictDataEntity, {
      where: {
        dictType: { $eq: dto.dictType },
        dictLabel: dto.dictLabel ? { $like: `%${dto.dictLabel}%` } : {},
        isAvailable: dto.isAvailable ? { $eq: dto.isAvailable } : {},
      },
    })

    return data
  },
})
