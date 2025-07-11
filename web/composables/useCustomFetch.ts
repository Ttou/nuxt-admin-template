export const useCustomFetch: typeof useFetch = (...args) => {
  const nuxtApp = useNuxtApp()

  return useFetch(args[0], {
    ...args[1],
    $fetch: nuxtApp.$customFetch,
  })
}
