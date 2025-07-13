import z from 'zod/v4'
import { isEmpty } from 'es-toolkit/compat'

export const FindSystemConfigByKeyDto = z.object({
  configKey: z.string({
    error: issue => isEmpty(issue.input) ? '请输入配置项Key' : '请输入正确的配置项Key',
  }),
})
