import { asClass, Lifetime } from 'awilix'

const registers = {
  configService: () => [ConfigService, asClass(ConfigService, { asyncInit: 'init', asyncInitPriority: 0, lifetime: Lifetime.SINGLETON })] as const,
  ormService: () => [ORMService, asClass(ORMService, { asyncInit: 'init', asyncDispose: 'close', asyncInitPriority: 10, asyncDisposePriority: 10, lifetime: Lifetime.SINGLETON })] as const,
  redisService: () => [RedisService, asClass(RedisService, { asyncInit: 'init', asyncDispose: 'close', asyncInitPriority: 10, asyncDisposePriority: 10, lifetime: Lifetime.SINGLETON })] as const,
  hashService: () => [HashService, asClass(HashService, { lifetime: Lifetime.SINGLETON })] as const,
  jwtService: () => [JWTService, asClass(JWTService, { lifetime: Lifetime.SINGLETON })] as const,
} as const

export const { container: serverContainer, init: initServerContainer, close: closeServerContainer } = defineContainer(registers)

export type IServerContainerRegistry = IContainerRegistry<typeof registers>
