import type { FactoryProvider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'

export const REDIS_CLIENT = Symbol('REDIS_CLIENT')

export const RedisClientFactory: FactoryProvider<Redis> = {
  provide: REDIS_CLIENT,
  useFactory: async (configService: ConfigService) => {
    const redis = new Redis({
      ...configService.get('redis'),
      lazyConnect: true,
    })

    try {
      await redis.connect()

      logger.debug('Redis 服务连接成功', { 0: 'RedisClientFactory' })
    }
    catch (error) {
      logger.error(`Redis 服务连接失败: ${error}`, { 0: 'RedisClientFactory' })
    }

    return redis
  },
  inject: [ConfigService],
}

export type IRedis = Redis
