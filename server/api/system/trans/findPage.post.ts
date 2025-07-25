import { FindTransPageDto } from '#shared/dtos'

export default defineEventHandler({
  handler: async () => {
    const event = useEvent()
    const em = useEM()

    const dto = await readValidatedBody(event, validateParse(FindTransPageDto))

    const { page, pageSize, ...rest } = dto

    const [data, total] = await em.findAndCount(SysTransEntity, {
      $and: [
        { transKey: rest.transKey ? { $like: `%${rest.transKey}%` } : {} },
        { remark: rest.remark ? { $like: `%${rest.remark}%` } : {} },
        { createdAt: rest.createBeginTime ? { $gte: rest.createBeginTime, $lte: rest.createEndTime } : {} },
      ],
    }, { limit: pageSize, offset: page - 1 })

    return { page, pageSize, data, total }
  },
})
