import { AxiosError } from 'axios'
import { isEmpty, isString } from 'lodash'
import { Context } from '@nuxt/types'
import { getErrorMessage } from '~/utils/parser'

export default function (ctx: Context) {
  ctx.$axios.setHeader('Accept', 'application/json')
  ctx.$axios.setHeader('Accept-Language', ctx.app.i18n.locale || 'ja')
  ctx.$axios.setHeader('X-API-KEY', ctx.$config.apiKey)
  ctx.$axios.onError((e: AxiosError) => {
    const { code, message, isNotify } = getErrorMessage(e, ctx)
    if (ctx.$errors.isValid() && code === 422) {
      ctx.$errors.fill(message)
    }
    if (isNotify && isString(message) && !isEmpty(ctx.$dialog)) {
      ctx.$dialog.notify.warning(message)
    }
    return Promise.reject(e)
  })
}
