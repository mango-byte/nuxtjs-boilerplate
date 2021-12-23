import type { Options } from '@nuxtjs/vuetify/dist/options'

export const vuetify: Options = {
  treeShake: true,
  customVariables: ['~/assets/variables.scss'],
  optionsPath: '~/config/vuetify.options.ts',
}
