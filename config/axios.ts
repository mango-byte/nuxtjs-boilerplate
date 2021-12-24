const proxy = process.env.CI ? true : process.env.PROXY === 'true'
export const isDev = process.env.NODE_ENV !== 'production'
export const axios = {
  proxy,
  retry: true,
  debug: isDev,
  credentials: true,
}
