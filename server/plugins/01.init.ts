export default defineNitroPlugin(async (nitroApp) => {
  await import('#shared/polyfills/BigIntPolyfill')

  await initAppContext()

  nitroApp.hooks.hook('close', async () => {
    await closeAppContext()
  })
})
