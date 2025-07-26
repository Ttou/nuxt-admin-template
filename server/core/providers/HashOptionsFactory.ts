import type { FactoryProvider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export interface IHashOptions {
  cost?: number | undefined | null
  salt?: string | Uint8Array | undefined | null
}

export const HASH_OPTIONS = Symbol('HASH_OPTIONS')

export const HashOptionsFactory: FactoryProvider<IHashOptions> = {
  provide: HASH_OPTIONS,
  useFactory: async (configService: ConfigService) => {
    const config = configService.get('hash')

    return config
  },
  inject: [ConfigService],
}
