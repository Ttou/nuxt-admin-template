import { UpdateSystemDictDataDto } from '#shared/dtos'
import { wrap } from '@mikro-orm/core'
import { HttpStatus } from '@nestjs/common'
import { omit } from 'es-toolkit'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.dictData.update'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(UpdateSystemDictDataDto))
    const em = useEM()

    const oldRecord = await em.findOne(SysDictDataEntity, {
      $and: [
        { id: { $eq: dto.id } },
      ],
    })

    if (!oldRecord) {
      throw createError({
        status: HttpStatus.NOT_FOUND,
        message: `字典值 ${dto.dictValue} 不存在`,
      })
    }

    wrap(oldRecord).assign(omit(dto, ['id']))

    await em.persist(oldRecord).flush()

    return null
  },
})
