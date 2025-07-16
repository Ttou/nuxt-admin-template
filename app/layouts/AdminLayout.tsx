import { PlusLayout } from 'plus-pro-components'

export default defineComponent({
  render() {
    return (
      <PlusLayout>
        {{
          ['default']: () => this.$slots.default?.(),
        }}
      </PlusLayout>
    )
  },
})
