import Redis from 'ioredis'

export class RedisService {
  private redis: Redis
  private configService: ConfigService

  constructor(opts: IServerContainerRegistry) {
    this.configService = opts.configService
  }

  private async init() {
    this.redis = new Redis({
      ...this.configService.get('redis'),
      lazyConnect: true,
    })

    await this.redis.connect()

    logger.debug('Redis 初始化成功')
  }

  private async close() {
    await this.redis.quit()
  }

  getRedis() {
    return this.redis
  }
}
