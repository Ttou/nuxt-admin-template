import { UpdateSystemDictTypeDto } from '#shared/dtos'
import { wrap } from '@mikro-orm/core'
import { HttpStatus } from '@nestjs/common'
import { omit } from 'es-toolkit'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.dictType.update'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(UpdateSystemDictTypeDto))
    const em = useEM()

    const oldRecord = await em.findOne(SysDictTypeEntity, {
      $and: [
        { id: { $eq: dto.id } },
      ],
    })

    if (!oldRecord) {
      throw createError({
        status: HttpStatus.NOT_FOUND,
        message: `字典类型不存在`,
      })
    }

    wrap(oldRecord).assign(omit(dto, ['id']))

    await em.persist(oldRecord).flush()

    return null
  },
})
