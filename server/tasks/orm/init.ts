import { MikroORM } from '@mikro-orm/core'

export default defineTask({
  meta: {
    name: 'orm:init',
    description: 'Execute ORM Schema Generator',
  },
  async run({ payload, context }) {
    if (IsDev) {
      const orm = nestApp.get(MikroORM)

      await orm.getSchemaGenerator().refreshDatabase()
      return null
    }

    return {
      result: 'Please run db:init in dev mode',
    }
  },
})
