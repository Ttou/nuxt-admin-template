import { LocaleSelect } from '#components'
import { ElSpace } from 'element-plus'
import { PlusLayout } from 'plus-pro-components'

export default defineComponent({
  render() {
    return (
      <PlusLayout hasBreadcrumb={false}>
        {{
          'header-right': () => (
            <>
              <ElSpace>
                <LocaleSelect />
              </ElSpace>
            </>
          ),
          'default': () => this.$slots.default?.(),
        }}
      </PlusLayout>
    )
  },
})
