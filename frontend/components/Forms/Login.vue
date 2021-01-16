<template>
  <v-form>
    <span class="text-xl">Enter your credentials below in order to login</span>
    <v-text-field
      v-model.lazy="email"
      type="email"
      label="E-mail"
      :error="emailErrors.length != 0"
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    />
    <v-text-field
      v-model.lazy="password"
      type="password"
      label="Password"
      hint="Passwords must contain a letter, a number
     and be at least 8 characters long"
      persistent-hint
      :error="passwordErrors.length != 0"
      :error-messages="passwordErrors"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    />
    <v-btn class="my-5" :disabled="$v.$invalid">Login</v-btn>
    <div>
      <span>New account?</span>
      <nuxt-link class="link" to="/" text @click.native="$emit('onFormSwitch')">
        Register here
      </nuxt-link>
    </div>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

const validPassword = (v) => {
  if (typeof v === 'undefined' || v === null || v === '') {
    return true
  }
  return /^(?=.*\d)(?=.*[a-z]).{8,}$/.test(v)
}

export default {
  mixins: [validationMixin],
  data: () => {
    return {
      email: null,
      password: null,
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), validPassword },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty || this.googleAuth) return []
      !this.$v.email.required && errors.push('This field is required')
      !this.$v.email.email && errors.push('Invalid e-mail')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return []
      !this.$v.password.required && errors.push('This field is required')
      !this.$v.password.minLength &&
        errors.push('You must enter at least 8 characters')
      !this.$v.password.validPassword && errors.push('Invalid password')

      return errors
    },
  },
}
</script>

<style lang="scss" scoped></style>
