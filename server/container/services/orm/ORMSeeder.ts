import type { Dictionary, EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export class ORMSeeder extends Seeder {
  async run(em: EntityManager, context?: Dictionary) {
    await this.call(em, [
      SysConfigSeeder,
    ])
  }
}
