import { CreateSystemDictDataDto } from '#shared/dtos'
import { HttpStatus } from '@nestjs/common'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.dictData.create'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(CreateSystemDictDataDto))
    const em = useEM()

    const oldRecord = await em.findOne(SysDictDataEntity, {
      $and: [
        { dictType: { $eq: dto.dictType } },
        { dictValue: { $eq: dto.dictValue } },
      ],
    })

    if (oldRecord) {
      throw createError({
        status: HttpStatus.BAD_REQUEST,
        message: `字典值 ${dto.dictValue} 已存在`,
      })
    }

    const config = em.create(SysDictDataEntity, dto)

    await em.persist(config).flush()

    return null
  },
})
