import type { EntityData } from '@mikro-orm/core'
import { FindTransAllDto } from '#shared/dtos'

export default defineEventHandler({
  handler: async () => {
    const event = useEvent()
    const em = useEM()

    const dto = await getValidatedQuery(event, validateParse(FindTransAllDto))

    const list = await em.getDriver().execute<EntityData<SysTransEntity>[]>(
      `--sql
      SELECT trans_key AS transKey
        ,
        json_extract ( trans_value, '$.${dto.locale}' ) AS transValue
      FROM
        sys_trans;
      `,
    )

    return Object.fromEntries(list.map(v => [v.transKey, v.transValue]))
  },
})
