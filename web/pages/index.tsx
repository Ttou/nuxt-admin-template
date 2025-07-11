import { NuxtLayout } from '#components'
import { ElButton } from 'element-plus'

export default defineComponent({
  render() {
    return (
      <NuxtLayout name="admin-layout">
        <div>
          <div>Hello World</div>
          <ElButton>哈哈</ElButton>
        </div>
      </NuxtLayout>
    )
  },
})
