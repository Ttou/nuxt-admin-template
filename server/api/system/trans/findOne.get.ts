import { FindTransOneDto } from '#shared/dtos'
import { HttpStatus } from '@nestjs/common'

export default defineEventHandler({
  handler: async () => {
    const event = useEvent()
    const em = useEM()

    const dto = await getValidatedQuery(event, validateParse(FindTransOneDto))

    const oldRecord = await em.findOne(SysTransEntity, {
      transKey: { $eq: dto.transKey },
    })

    if (!oldRecord) {
      throw createError({
        status: HttpStatus.NOT_FOUND,
        message: '记录不存在',
      })
    }

    return oldRecord
  },
})
