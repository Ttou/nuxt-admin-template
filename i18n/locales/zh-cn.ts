export default defineI18nLocale(async (locale) => {
  const zhCn = await import('element-plus/es/locale/lang/zh-cn')
  const plusZhCn = await import('plus-pro-components/es/locale/lang/zh-cn')

  return {
    ...zhCn.default,
    ...plusZhCn.default,
  }
})
