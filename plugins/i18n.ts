import { Context } from '@nuxt/types/app'

export default function ({ app, $vuetify, $dayjs, $axios }: Context) {
  $vuetify.lang.current = app.i18n.locale
  $dayjs.locale(app.i18n.locale || 'ja')
  app.i18n.onLanguageSwitched = (_, locale) => {
    $dayjs.locale(locale || 'ja')
    $vuetify.lang.current = locale || 'ja'
    $axios.setHeader('Accept-Language', app.i18n.locale || 'ja')
  }
}
