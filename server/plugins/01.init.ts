export default defineNitroPlugin(async (nitroApp) => {
  await import('#shared/polyfills/BigIntPolyfill')

  await initNestApp()

  nitroApp.hooks.hook('close', async () => {
    await closeNestApp()
  })
})
