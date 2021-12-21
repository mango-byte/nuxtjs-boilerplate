import { Context } from '@nuxt/types'

export default function ({ app, $auth }: Context) {
  $auth.onRedirect((to) => {
    return app.localePath(to)
  })
}
