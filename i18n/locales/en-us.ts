export default defineI18nLocale(async (locale) => {
  const en = await import('element-plus/es/locale/lang/en')
  const plusEn = await import('plus-pro-components/es/locale/lang/en')

  return {
    ...en.default,
    ...plusEn.default,
  }
})
