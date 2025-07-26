import type { IRedis } from './RedisClientFactory'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CacheService {
  private readonly keyPrefix = 'cache:'
  private readonly ttl = 10 * 1000

  @Inject(REDIS_CLIENT)
  redis!: IRedis

  async get<T>(key: string): Promise<T | null> {
    const cacheKey = this.getKey(key)
    const value = await this.redis.get(cacheKey)
    return value ? JSON.parse(value) : null
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const cacheKey = this.getKey(key)
    await this.redis.set(cacheKey, JSON.stringify(value), 'EX', ttl ?? this.ttl)
  }

  async delete(key: string): Promise<void> {
    const cacheKey = this.getKey(key)
    await this.redis.del(cacheKey)
  }

  private getKey(key: string): string {
    return this.keyPrefix + key
  }
}
