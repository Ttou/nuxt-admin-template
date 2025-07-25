import { MikroORM } from '@mikro-orm/core'

export default defineTask({
  meta: {
    name: 'orm:seed',
    description: 'Execute ORM Seeder',
  },
  async run({ payload, context }) {
    if (IsDev) {
      const orm = nestApp.get(MikroORM)

      await orm.getSeeder().seed(ORMSeeder)
      return null
    }

    return {
      result: 'Please run db:seed in dev mode',
    }
  },
})
