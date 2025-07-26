import type { FactoryProvider } from '@nestjs/common'
import type { Header, Validation } from '@node-rs/jsonwebtoken'
import type { StringValue } from 'ms'
import { HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { isEmpty } from 'es-toolkit/compat'

export interface IJwtOptions {
  key: string | Uint8Array
  expiresIn: StringValue
  header?: Header | undefined | null
  validation?: Validation | undefined | null
}

export const JWT_OPTIONS = Symbol('JWT_OPTIONS')

export const JwtOptionsFactory: FactoryProvider<IJwtOptions> = {
  provide: JWT_OPTIONS,
  useFactory: async (configService: ConfigService) => {
    const config = configService.get('jwt')

    if (isEmpty(config)) {
      throw createError({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'JWT 配置项不能为空',
      })
    }

    return config
  },
  inject: [ConfigService],
}
