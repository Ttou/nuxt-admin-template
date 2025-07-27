import { RemoveDto } from '#shared/dtos'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.dictType.remove'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(RemoveDto))
    const em = useEM()

    const oldDictTypeRecords = await em.find(SysDictTypeEntity, {
      id: { $in: dto.ids },
    })

    const oldDictDataRecords = await em.find(SysDictDataEntity, {
      dictType: { $in: oldDictTypeRecords.map(item => item.dictType) },
    })

    await em.remove([...oldDictTypeRecords, ...oldDictDataRecords]).flush()

    return null
  },
})
