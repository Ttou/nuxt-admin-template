import { asClass, Lifetime } from 'awilix'

const registerData = {
  configService: () => [ConfigService, asClass(ConfigService, { asyncInit: 'init', asyncInitPriority: 0, lifetime: Lifetime.SINGLETON })] as const,
  ormService: () => [ORMService, asClass(ORMService, { asyncInit: 'init', asyncDispose: 'close', asyncInitPriority: 10, asyncDisposePriority: 10, lifetime: Lifetime.SINGLETON })] as const,
  redisService: () => [RedisService, asClass(RedisService, { asyncInit: 'init', asyncDispose: 'close', asyncInitPriority: 10, asyncDisposePriority: 10, lifetime: Lifetime.SINGLETON })] as const,
  hashService: () => [HashService, asClass(HashService, { lifetime: Lifetime.SINGLETON })] as const,
  jwtService: () => [JWTService, asClass(JWTService, { lifetime: Lifetime.SINGLETON })] as const,
} as const

type IRegisterDataKey = keyof typeof registerData

export const serverContainerRegistry = Object.entries(registerData).reduce((acc, [key, value]) => {
  // @ts-ignore
  acc[key] = value()[1]
  return acc
}, {} as { [key in IRegisterDataKey]: ReturnType<typeof registerData[key]>[1] })

export type IServerContainerRegistry = { [key in IRegisterDataKey]: InstanceType<ReturnType<typeof registerData[key]>[0]> }
