import { EntityManager } from '@mikro-orm/mysql'

export function useEM() {
  const { context } = useEvent()

  return nestApp.get(EntityManager).fork({ loggerContext: { reqId: context.reqId } })
}
