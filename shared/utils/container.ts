import { createContainer, InjectionMode } from 'awilix'
import { AwilixManager } from 'awilix-manager'
import { mapValues } from 'es-toolkit'

interface IRegisters {
  [key: string]: () => readonly [any, any]
}

export type IContainerRegistry<T extends IRegisters> = {
  [key in keyof T]: InstanceType<ReturnType<T[key]>[0]>
}

export function defineContainer<T extends IRegisters>(registers: T) {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
    strict: true
  })

  container.register(mapValues(registers, v => v()[1]))

  const manager = new AwilixManager({
    diContainer: container,
    asyncInit: true,
    asyncDispose: true,
    strictBooleanEnforced: true
  })

  async function init() {
    await manager.executeInit()
  }

  async function close() {
    await manager.executeDispose()
    await container.dispose()
  }

  return { container, init, close }
}
