import type { ILocaleEnum } from '#shared/enums'
import { LocaleEnum } from '#shared/enums'
import { ElOption, ElSelect } from 'element-plus'
import * as styles from './LocaleSelect.css'

export default defineComponent({
  name: 'LocaleSelect',
  setup() {
    const mainStore = useMainStore()

    const locale = computed(() => mainStore.locale)

    function handleChange(value: ILocaleEnum) {
      mainStore.changeLocale(value)
    }

    return {
      locale,
      handleChange,
    }
  },
  render() {
    return (
      <div class={styles.localeSelect}>
        <ElSelect modelValue={this.locale} onChange={this.handleChange}>
          {LocaleEnum.toSelect().map(v => <ElOption value={v.value} key={v.value} label={v.label}></ElOption>)}
        </ElSelect>
      </div>
    )
  },
})
