export const i18n = {
  seo: false,
  locales: [
    {
      code: 'ja',
      iso: 'ja-JP',
      file: 'ja',
      name: '日本',
      flag: '/flags/jp.svg',
    },
    {
      code: 'en',
      iso: 'en-US',
      file: 'en',
      name: 'English',
      flag: '/flags/us.svg',
    },
  ],
  defaultLocale: process.env.LOCALE || 'ja',
  lazy: true,
  vueI18n: {
    fallbackLocale: 'ja',
    messages: {},
  },
  langDir: 'locales/',
  vueI18nLoader: true,
  vuex: {
    moduleName: 'i18n',
    syncLocale: true,
    syncMessages: true,
    syncRouteParams: true,
  },
  detectBrowserLanguage: {
    useCookie: true,
    alwaysRedirect: true,
  },
}
