import { NuxtLayout, NuxtPage } from '#components'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
  setup() {
    const mainStore = useMainStore()

    return {
      mainStore,
    }
  },
  render() {
    return (
      <ElConfigProvider locale={this.mainStore.elLocale}>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </ElConfigProvider>
    )
  },
})
