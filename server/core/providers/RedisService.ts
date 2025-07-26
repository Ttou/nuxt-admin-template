import type { IRedis } from './RedisClientFactory'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class RedisService {
  @Inject(REDIS_CLIENT)
  redis!: IRedis
}
