import { CreateSystemDictTypeDto } from '#shared/dtos'
import { HttpStatus } from '@nestjs/common'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.dictType.create'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(CreateSystemDictTypeDto))
    const em = useEM()

    const oldRecord = await em.findOne(SysDictTypeEntity, {
      dictType: { $eq: dto.dictType },
    })

    if (oldRecord) {
      throw createError({
        status: HttpStatus.CONFLICT,
        message: `字典类型 ${dto.dictType} 已存在`,
      })
    }

    const config = em.create(SysDictTypeEntity, dto)

    await em.persist(config).flush()

    return null
  },
})
