import type { NuxtOptionsBuild, NuxtWebpackEnv } from '@nuxt/types/config/build'
import type { Configuration } from 'webpack'

export const build: NuxtOptionsBuild = {
  extractCSS: true,
  extend(config: Configuration, { isDev, isClient }: NuxtWebpackEnv) {
    if (!isDev && isClient) {
      config.module?.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
        exclude: /(node_modules)/,
      })
    }
    if (isDev) {
      config.mode = 'development'
    }
    config.node = {
      fs: 'empty',
    }
  },
  devMiddleware: {
    headers: {
      'Cache-Control': 'no-store',
      Vary: '*',
    },
  },
}
