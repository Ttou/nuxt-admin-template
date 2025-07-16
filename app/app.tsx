// FIX types
import '../.nuxt/types/imports.d.ts'
import '../node_modules/pinia-plugin-persistedstate/dist/index.d.ts'

import { NuxtLayout, NuxtPage } from '#components'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
  render() {
    return (
      <ElConfigProvider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </ElConfigProvider>
    )
  },
})
