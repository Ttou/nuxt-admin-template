export default defineTask({
  meta: {
    name: 'orm:init',
    description: 'Execute ORM Schema Generator',
  },
  async run({ payload, context }) {
    if (IsDev) {
      const orm = serverContainer.cradle.ormService.getORM()

      await orm.getSchemaGenerator().refreshDatabase()
      return null
    }

    return {
      result: 'Please run db:init in dev mode',
    }
  },
})
