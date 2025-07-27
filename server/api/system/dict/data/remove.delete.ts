import { RemoveDto } from '#shared/dtos'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.dictData.remove'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(RemoveDto))
    const em = useEM()

    const oldRecords = await em.find(SysDictDataEntity, {
      id: { $in: dto.ids },
    })

    await em.remove(oldRecords).flush()

    return null
  },
})
