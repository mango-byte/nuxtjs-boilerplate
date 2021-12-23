<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm4>
      <v-toolbar
        class="d-flex justify-space-around text-center mb-3"
        height="auto"
        tile
        elevation="0"
      >
        <div class="mx-auto">
          <v-img
            contain
            height="52"
            class="mx-auto mb-4"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="DD Room"
          />
          <v-toolbar-title class="v-login__title text-h4 font-weight-black">
            {{ $t('login.title') }}
          </v-toolbar-title>
        </div>
      </v-toolbar>
      <v-card tile>
        <v-card-text>
          <v-alert
            v-model="invalid"
            data-test-id="login-alert-msg"
            border="left"
            close-text="Close Alert"
            color="red lighten-2"
            dark
            dismissible
            @input="flushError"
          >
            {{ $errors.first('message') }}
          </v-alert>
          <v-form
            ref="form"
            v-model="valid"
            :readonly="readonly"
            @submit.prevent="submit"
            @keydown.native="$errors.onKeydown($event, 'loginForm')"
          >
            <v-row dense>
              <v-col cols="12" data-test-id="login-input-identifier">
                <label data-test-id="login-identifier">
                  {{ $t('attributes.identifier') }}
                </label>
                <v-text-field
                  v-model="loginForm.identifier"
                  :placeholder="$t('attributes.identifier')"
                  dense
                  outlined
                  single-line
                  persistent-placeholder
                  name="identifier"
                  :error-messages="$errors.first('identifier')"
                  :disabled="busy"
                />
              </v-col>
              <v-col cols="12" data-test-id="login-input-password">
                <label data-test-id="login-password">
                  {{ $t('attributes.password') }}
                </label>
                <v-text-field
                  v-model="loginForm.password"
                  data-test-id="login-input-password"
                  :placeholder="$t('attributes.password')"
                  type="password"
                  dense
                  outlined
                  single-line
                  persistent-placeholder
                  name="password"
                  :error-messages="$errors.first('password')"
                  :disabled="busy"
                />
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue accent-2"
                :disabled="$errors.any() || busy"
                :depressed="!busy && !$errors.any()"
                :dark="!busy && !$errors.any()"
                to="/register"
              >
                Register
              </v-btn>
              <v-btn
                data-test-id="login-submit-btn"
                color="blue accent-2"
                :disabled="$errors.any() || busy"
                :depressed="!busy && !$errors.any()"
                :dark="!busy && !$errors.any()"
                :ripple="false"
                :loading="busy"
                type="submit"
                @click="submit"
              >
                {{ $t('common.login') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { sleep } from 'vue-axios-http'
import type { MetaInfo } from 'vue-meta'
import ValidatorJs from '~/mixins/validator-js'
import { getErrorMessage, isValidJson, parseLodash } from '~/utils/parser'

@Component({
  name: 'login',
  auth: 'guest',
  layout: 'auth',
})
export default class Login extends mixins(ValidatorJs) {
  head(): MetaInfo {
    return {
      title: this.pageTitle,
    }
  }

  pageTitle = 'Login'
  valid = false
  loginForm = { identifier: '', password: '' }
  busy = false
  readonly = true
  invalid = false
  validator = {
    rules: {
      identifier: 'required|email|min:8|max:255|string',
      password: 'required|max:255',
    },
  }

  async submit() {
    const data = this.loginForm
    if (!this.checkValidate(data)) return
    this.busy = true
    this.invalid = false
    try {
      await this.$auth.loginWith('local', { data })
    } catch (err) {
      const { message, isNotify } = getErrorMessage(err)
      this.invalid = isNotify
      if (!isValidJson(err.request) && isNotify) {
        this.$errors.fill({ message })
      } else {
        const response = {}
        if (isValidJson(err.request.response)) {
          Object.assign(response, parseLodash(err.request.response))
        }
        this.$errors.fill(response)
      }
    } finally {
      this.busy = false
    }
  }

  flushError() {
    this.$errors.flush()
  }

  async mounted() {
    this.flushError()
    await sleep(1000)
    this.readonly = false
  }
}
</script>
