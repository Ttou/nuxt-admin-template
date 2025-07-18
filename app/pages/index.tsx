import type { PlusPageProps } from 'plus-pro-components'
import { PlusPage } from 'plus-pro-components'

definePageMeta({
  layout: 'admin-layout',
})

export default defineComponent({
  setup() {
    const plusPageProps: Ref<PlusPageProps> = ref({
      columns: [
        {
          label: '创建时间',
          prop: 'createTime',
          valueType: 'date-picker',
        },
      ],
      request: async () => {
        return {
          total: 0,
          data: [],
        }
      },
    })

    return {
      plusPageProps,
    }
  },
  render() {
    return (
      <PlusPage {...this.plusPageProps} />
    )
  },
})
