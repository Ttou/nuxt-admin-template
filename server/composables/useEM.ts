export function useEM() {
  const { context } = useEvent()
  const em = serverContainer.cradle.ormService.getEM()

  return em.fork({ loggerContext: { reqId: context.reqId } })
}
