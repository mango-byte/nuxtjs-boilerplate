import { attempt, get, isError } from 'lodash'
import type { AxiosError } from 'axios'
import type { Context } from '@nuxt/types'
import type { TranslateResult } from 'vue-i18n'

export interface ErrorState {
  isNotify: boolean
  code?: number | string
  message: Record<string, any>
  error: string
}
export function parseLodash(str = '') {
  return attempt(JSON.parse.bind(null, str)) || {}
}
export function isValidJson(str = '') {
  return !isError(parseLodash(str))
}
export function getErrorMessage(e: AxiosError, ctx?: Context): ErrorState {
  const { response } = e
  const code = response && response.status
  let defaultMessage: TranslateResult
  if (ctx && process.server) {
    defaultMessage = ctx.i18n.t('messages.unexpectedError')
  } else {
    defaultMessage = window.$nuxt.$i18n.t('messages.unexpectedError')
  }
  const error = get(response?.data, 'error', 'unexpectedError')
  let message = get(response?.data, 'message', defaultMessage)
  let isNotify = true
  switch (code) {
    case 400:
      isNotify = false
      break
    case 422:
      isNotify = false
      break
    default:
      message = defaultMessage
      break
  }
  return { isNotify, code, message, error }
}
