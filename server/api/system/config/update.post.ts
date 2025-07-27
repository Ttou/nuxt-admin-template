import { UpdateSystemConfigDto } from '#shared/dtos'
import { wrap } from '@mikro-orm/core'
import { HttpStatus } from '@nestjs/common'
import { omit } from 'es-toolkit'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.config.update'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(UpdateSystemConfigDto))
    const em = useEM()

    const oldRecord = await em.findOne(SysConfigEntity, {
      $and: [
        { id: { $eq: dto.id } },
      ],
    })

    if (!oldRecord) {
      throw createError({
        status: HttpStatus.NOT_FOUND,
        message: `配置标识不存在`,
      })
    }

    wrap(oldRecord).assign(omit(dto, ['id']))

    await em.persist(oldRecord).flush()

    return null
  },
})
