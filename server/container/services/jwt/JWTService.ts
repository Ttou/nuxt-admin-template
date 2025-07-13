import type { Header, Validation } from '@node-rs/jsonwebtoken'
import jwt from '@node-rs/jsonwebtoken'

export class JWTService {
  private jwtOptions: Record<string, any>

  constructor(opts: IServerContainerRegistry) {
    this.jwtOptions = opts.configService.get('jwt')
  }

  /**
   * 签名
   */
  async sign(payload: any, header?: Header) {
    const jti = uuidv4()
    const iat = getUnixTimestamp('seconds')
    const exp = iat + parseMs('seconds', this.jwtOptions.expiresIn)
    const claims = {
      ...payload,
      jti,
      iat,
      exp,
    }
    const token = await jwt.sign(claims, this.jwtOptions.key, header ?? this.jwtOptions.header ?? {})

    return {
      token,
      tokenId: jti,
    }
  }

  /**
   * 校验
   */
  async verify(token: string, validation?: Validation) {
    return await jwt.verify(token, this.jwtOptions.key, validation ?? this.jwtOptions.validation ?? {})
  }
}
