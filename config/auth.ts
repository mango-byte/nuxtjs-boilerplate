export const auth = {
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
}
