import { CreateTransDto } from '#shared/dtos'
import { HttpStatus } from '@nestjs/common'

export default defineEventHandler({
  handler: async () => {
    const event = useEvent()
    const em = useEM()

    const dto = await readValidatedBody(event, validateParse(CreateTransDto))

    const oldRecord = await em.findOne(SysTransEntity, { transKey: { $eq: dto.transKey } })

    if (oldRecord) {
      throw createError({
        status: HttpStatus.CONFLICT,
        message: '记录已存在',
      })
    }

    const newRecord = em.create(SysTransEntity, dto)

    await em.persistAndFlush(newRecord)

    return null
  },
})
