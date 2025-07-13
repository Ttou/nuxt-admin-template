export default defineTask({
  meta: {
    name: 'orm:seed',
    description: 'Execute ORM Seeder',
  },
  async run({ payload, context }) {
    if (IsDev) {
      const orm = serverContainer.cradle.ormService.getORM()

      await orm.getSeeder().seed(ORMSeeder)
      return null
    }

    return {
      result: 'Please run db:seed in dev mode',
    }
  },
})
