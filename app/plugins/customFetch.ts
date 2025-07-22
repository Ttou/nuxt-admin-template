export default defineNuxtPlugin((nuxtApp) => {
  const $customFetch = $fetch.create({
    baseURL: '/api',
    onRequest({ request, options, error }) {
      const mainStore = useMainStore()
      const userStore = useUserStore()

      options.headers.set('Accept-Language', mainStore.locale)

      if (userStore.token) {
        // Add Authorization header
        options.headers.set('Authorization', `Bearer ${userStore.token}`)
      }
    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch,
    },
  }
})
