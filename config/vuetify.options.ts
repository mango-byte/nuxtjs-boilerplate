import { Context } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'
import en from '~/locales/en/vuetify'
import ja from '~/locales/ja/vuetify'

export default ({ app }: Context) => {
  const i18n = app.i18n || {}
  return {
    theme: {
      dark: false,
      options: { customProperties: true },
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
        light: {
          background: '#ffffff',
          surface: '#f2f5f8',
          primary: '#615EE0',
          secondary: colors.grey.darken3,
          tertiary: '#9F9FB1',
          accent: colors.grey.darken3,
          error: '#F15454',
          info: '#00d3ee',
          success: '#3EC283',
          warning: '#ffa21a',
        },
      },
    },
    lang: {
      locales: { en, ja },
      current: i18n.locale || 'ja',
      t: (key: string, ...params: any[]) => app.i18n.t(key, params),
    },
  }
}
