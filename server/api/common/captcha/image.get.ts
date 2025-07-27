export default defineEventHandler({
  handler: async () => {
    return await nestApp.get(CaptchaService).image()
  },
})
