import { UpdateTransDto } from '#shared/dtos'
import { wrap } from '@mikro-orm/core'
import { HttpStatus } from '@nestjs/common'

export default defineEventHandler({
  handler: async () => {
    const event = useEvent()
    const em = useEM()

    const dto = await readValidatedBody(event, validateParse(UpdateTransDto))

    const { id, ...rest } = dto

    const oldRecord = await em.findOne(SysTransEntity, { id: { $eq: dto.id } })

    if (!oldRecord) {
      throw createError({
        status: HttpStatus.NOT_FOUND,
        message: '记录不存在',
      })
    }

    wrap(oldRecord).assign(rest)

    await em.persist(oldRecord).flush()

    return null
  },
})
