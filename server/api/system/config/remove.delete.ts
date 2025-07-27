import { RemoveDto } from '#shared/dtos'
import { YesOrNoEnum } from '#shared/enums'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.config.remove'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(RemoveDto))
    const em = useEM()

    const oldRecords = await em.find(SysConfigEntity, {
      $and: [
        { id: { $in: dto.ids } },
        { isBuiltin: { $eq: YesOrNoEnum.NO } },
      ],
    })

    await em.remove(oldRecords).flush()

    return null
  },
})
