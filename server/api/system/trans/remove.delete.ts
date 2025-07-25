import { RemoveTransDto } from '#shared/dtos'

export default defineEventHandler({
  handler: async () => {
    const event = useEvent()
    const em = useEM()

    const dto = await readValidatedBody(event, validateParse(RemoveTransDto))

    const oldRecords = await em.find(SysConfigEntity, {
      id: { $in: dto.ids },
    })

    await em.remove(oldRecords).flush()

    return null
  },
})
