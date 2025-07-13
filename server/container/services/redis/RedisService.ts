import type Redis from 'ioredis'

export class RedisService {
  private redis: Redis

  constructor(opts) {}

  private async init() {
    console.log('init redis')
  }

  private async close() {}

  getRedis() {
    return this.redis
  }
}
