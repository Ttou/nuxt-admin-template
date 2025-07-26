import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class LogoutService {
  private readonly keyPrefix = 'logout:'

  @Inject()
  private readonly cacheService!: CacheService

  @Inject()
  private readonly jwtService!: JwtService

  /**
   * 添加到已登出
   */
  async add(token: string) {
    const result = await this.jwtService.verify(token)
    const ttl = (result.exp - result.iat) * 1000
    const key = this.getKey(result.jti)

    this.cacheService.set(key, true, ttl)
  }

  /**
   * 校验是否已登出
   */
  async verify(token: string) {
    const result = await this.jwtService.verify(token)
    const key = this.getKey(result.jti)
    const isLogout = await this.cacheService.get<boolean>(key)

    return !!isLogout
  }

  private getKey(key: string) {
    return this.keyPrefix + key
  }
}
