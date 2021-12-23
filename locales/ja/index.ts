import attributes from './attributes'
import messages from './messages'
import login from './login'
import dialog from './dialog'
import common from './common'
import vuetify from './vuetify'

export default {
  attributes,
  app: {
    title: 'NuxtJs Boilerplate',
  },
  common,
  login,
  messages,
  $vuetify: vuetify,
  $dialog: dialog,
}
