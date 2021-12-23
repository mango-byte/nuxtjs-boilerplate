<template>
  <v-layout flex align-center justify-center>
    <v-card>
      <v-card-text>
        <v-form
          ref="registerForm"
          v-model="valid"
          lazy-validation
          @submit.prevent="onRegister"
          @keydown.native="$errors.onKeydown($event, 'register')"
        >
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="register.firstName"
                label="First Name"
                maxlength="20"
                required
                :error-messages="$errors.first('register.firstName')"
                name="firstName"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="register.lastName"
                label="Last Name"
                maxlength="20"
                required
                :error-messages="$errors.first('register.lastName')"
                name="lastName"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="register.email"
                label="E-mail"
                required
                :error-messages="$errors.first('register.email')"
                name="email"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="register.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter
                :error-messages="$errors.first('register.password')"
                @click:append="show1 = !show1"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="register.verify"
                block
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm Password"
                counter
                @click:append="show1 = !show1"
              />
            </v-col>
            <v-spacer />
            <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
              <v-btn
                x-large
                block
                :disabled="!valid"
                color="success"
                type="submit"
              >
                Register
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import type { MetaInfo } from 'vue-meta'
import ValidatorJs from '~/mixins/validator-js'
import { ValidatorEntity } from '~/domain/entity'
import { RegisterEntity } from '~/domain/user/entity'

@Component({
  name: 'register',
  auth: 'guest',
  layout: 'auth',
  head(): MetaInfo {
    return {
      title: 'Register',
    }
  },
})
export default class Register extends mixins(ValidatorJs) {
  valid = false
  show1 = false
  register: RegisterEntity = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verify: '',
  }

  validator: ValidatorEntity = {
    rules: {
      register: {
        firstName: 'required|string|min:3|max:255',
        lastName: 'required|string|min:3|max:255',
        email: 'required|email|min:10|max:255',
        password: 'required|password|min:8|max:255',
        verify: '',
      },
    },
    messages: {},
    attributes: {},
  }

  onRegister() {
    const register = this.register
    if (!this.checkValidate({ register })) return
    this.$store.dispatch('user/register', register)
  }
}
</script>
