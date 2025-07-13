import { MikroORM } from '@mikro-orm/core'
import { MySqlDriver } from '@mikro-orm/mysql'

export class ORMService {
  private orm!: MikroORM<MySqlDriver>
  private configService!: ConfigService

  constructor(opts: IServerContainerRegistry) {
    this.configService = opts.configService
  }

  private async init() {
    this.orm = await MikroORM.init({
      ...this.configService.get('orm'),
      entities: [
        SysConfigEntitySchema,
      ],
      driver: MySqlDriver,
      metadataProvider: ORMMetadataProvider,
      loggerFactory: opts => new ORMLogger(opts),
    })

    logger.debug('ORM 初始化成功')
  }

  private async close() {
    await this.orm.close(true)
  }

  getORM() {
    return this.orm
  }

  getEM() {
    return this.orm.em
  }
}
