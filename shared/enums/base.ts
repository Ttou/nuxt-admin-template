import { Enum } from 'enum-plus'

declare global {
  export interface EnumExtension<T, K, V> {
    toKeyValueMap: () => Record<K, V>
    toValues: () => V[]
  }
}

Enum.extends({
  toKeyValueMap(this: ReturnType<typeof Enum>) {
    return this.items.reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {})
  },
  toValues(this: ReturnType<typeof Enum>) {
    return this.items.map(item => item.value)
  },
})

export { Enum }
