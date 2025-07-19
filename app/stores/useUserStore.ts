import { useStorage } from '@vueuse/core'

export default defineStore('user', () => {
  const token = useStorage('token', '')

  return {
    token,
  }
})
