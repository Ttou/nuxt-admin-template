import { isEmpty } from 'es-toolkit/compat'
import z from 'zod/v4'

export const RemoveDTO = z.object({
  ids: z.array(z.string(), { error: issue => isEmpty(issue.input) ? '请选择要删除的项' : '请选择正确的项' }),
})
