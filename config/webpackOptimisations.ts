import type { NuxtWebpackOptimisationOptions } from 'nuxt-webpack-optimisations'
import { isDev } from './axios'
const { CI } = process.env

export const webpackOptimisations: NuxtWebpackOptimisationOptions = {
  features: {
    esbuildLoader: true,
    parallelPlugin: false,
    esbuildMinifier: true,
    imageFileLoader: true,
    postcssNoPolyfills: true,
    webpackOptimisations: true,
    cacheLoader: !isDev && !!CI,
    hardSourcePlugin: !isDev && !!CI,
  },
  debug: isDev,
  measure: false,
  measureMode: 'all',
}
