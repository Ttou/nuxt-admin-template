import { CreateSystemConfigDto } from '#shared/dtos'
import { HttpStatus } from '@nestjs/common'

export default defineEventHandler({
  onRequest: [
    useAuthentication(),
    useAuthorization('sys.menu.system.config.create'),
  ],
  handler: async () => {
    const event = useEvent()
    const dto = await readValidatedBody(event, validateParse(CreateSystemConfigDto))
    const em = useEM()

    const oldRecord = await em.findOne(SysConfigEntity, {
      configKey: { $eq: dto.configKey },
    })

    if (oldRecord) {
      throw createError({
        status: HttpStatus.CONFLICT,
        message: `配置标识 ${dto.configKey} 已存在`,
      })
    }

    const config = em.create(SysConfigEntity, dto)

    await em.persist(config).flush()

    return null
  },
})
