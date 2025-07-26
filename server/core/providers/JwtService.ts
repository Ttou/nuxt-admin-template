import { Inject, Injectable } from '@nestjs/common'
import jwt from '@node-rs/jsonwebtoken'

@Injectable()
export class JwtService {
  @Inject(JWT_OPTIONS)
  private readonly jwtOptions!: IJwtOptions

  /**
   * 签名
   */
  async sign(payload: any, header?: IJwtOptions['header']) {
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
  async verify(token: string, validation?: IJwtOptions['validation']) {
    return await jwt.verify(token, this.jwtOptions.key, validation ?? this.jwtOptions.validation ?? {})
  }
}
