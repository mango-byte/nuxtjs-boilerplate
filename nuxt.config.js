import colors from 'vuetify/es5/util/colors'
const pathRewrite = process.env.API_PREFIX

export default {
  head: {
    titleTemplate: '%s - Nuxtjs Boilerplate',
    title: 'Nuxtjs Boilerplate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  modules: [
    'vue-axios-http/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    'vuetify-dialogue/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/dayjs',
  ],
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  proxy: {
    [pathRewrite]: {
      target: process.env.API_URL,
      pathRewrite: {
        [`^${pathRewrite}`]: '',
      },
      ws: true,
    },
  },
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  i18n: {
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
  },
  eslint: {
    emitWarning: true,
    failOnError: true,
    lintDirtyModulesOnly: false,
  },
  router: {
    // middleware: ['auth'],
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    token: {
      prefix: `${process.env.npm_package_name || 'nuxt_boilerplate'}._token.`,
      global: true,
    },
    strategies: {
      local: {
        token: {
          property: 'token.accessToken',
          global: true,
          required: true,
          maxAge: 60 * 60 * 24 * 180,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/me', method: 'get' },
        },
      },
    },
    plugins: [{ src: '~/plugins/axios', ssr: true }, { src: '~/plugins/auth' }],
  },
  build: {},
}
