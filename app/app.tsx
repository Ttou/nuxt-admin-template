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
