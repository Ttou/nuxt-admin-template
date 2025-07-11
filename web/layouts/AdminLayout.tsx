import { PlusLayout } from 'plus-pro-components'

export default defineComponent({
  render() {
    return (
      <PlusLayout>{this.$slots.default?.()}</PlusLayout>
    )
  },
})
