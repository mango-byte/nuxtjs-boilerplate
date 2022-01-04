import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { cloneDeep, get } from 'lodash'
import Validator from '@chantouchsek/validatorjs'
import defu from 'defu'
import type { ValidatorEntity } from '~/domain/entity'

@Component
export default class ValidatorJs extends Vue {
  validator: ValidatorEntity = {
    rules: {},
    messages: {},
    attributes: {},
  }

  validateOnInput(payload?: Record<string, any>) {
    const { input, rules } = payload || {}
    const vMessage = get(this.validator, 'messages', {})
    const vAttributes = get(this.validator, 'attributes', {})
    const locale = get(this.$i18n, 'locale', 'en')
    const customMessages = defu({}, vMessage)
    const customAttributes = defu({}, vAttributes)
    try {
      const lang = require(`~/locales/${locale}`)
      const { attributes = {}, messages = {} } = lang.default
        ? lang.default
        : lang
      const options = {
        locale,
        confirmedReverse: true,
        customMessages: defu(customMessages, messages),
        customAttributes: defu(customAttributes, attributes),
      }
      const validator = new Validator(input, rules, options)
      if (validator.fails()) {
        this.$errors.fill(validator.errors.all())
        return false
      }
      this.$errors.flush()
      return true
    } catch (e) {
      console.error(e)
      this.$errors.flush()
    }
  }

  checkValidate(payload?: Record<string, any>) {
    if (!payload) {
      payload = {}
    }
    const data = defu(payload, cloneDeep(this.$data))
    const rules = get(this.validator, 'rules', {})
    const ruleEntries = Object.keys(rules)
    let input = {}
    for (const rule of ruleEntries) {
      const item = get(data, rule)
      input = defu(input, { [rule]: item })
    }
    return this.validateOnInput({ input, rules })
  }

  beforeDestroy() {
    this.$errors.flush()
  }
}
