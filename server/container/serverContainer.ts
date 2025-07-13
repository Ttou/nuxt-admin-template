import { createContainer, InjectionMode } from 'awilix'
import { AwilixManager } from 'awilix-manager'

const serverContainer = createContainer<IServerContainerRegistry>({
  injectionMode: InjectionMode.PROXY,
  strict: true,
})

const serverManager = new AwilixManager({
  diContainer: serverContainer,
  asyncInit: true,
  asyncDispose: true,
  strictBooleanEnforced: true,
})

serverContainer.register(serverContainerRegistry)

async function initServerContainer() {
  await serverManager.executeInit()
}

async function closeServerContainer() {
  await serverManager.executeDispose()
  await serverContainer.dispose()
}

export { serverContainer, initServerContainer, closeServerContainer }
