import z from 'zod/v4'

export const PageDto = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
})
