import z from 'zod/v4'

export const PageDTO = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
})
