<template>
  <v-form>
    <span class="text-xl">Please fill all the fields below</span>
    <v-text-field
      v-model.lazy="firstName"
      type="text"
      label="First Name"
      :error="firstNameErrors.length != 0"
      :error-messages="firstNameErrors"
      @input="$v.firstName.$touch()"
      @blur="$v.firstName.$touch()"
    />
    <v-text-field
      v-model.lazy="lastName"
      type="text"
      label="Last Name"
      :error="lastNameErrors.length != 0"
      :error-messages="lastNameErrors"
      @input="$v.lastName.$touch()"
      @blur="$v.lastName.$touch()"
    />
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
    <v-btn class="my-5" :disabled="$v.$invalid">Register</v-btn>
    <div>
      <span>Already have an account?</span>
      <nuxt-link class="link" to="/" text @click.native="$emit('onFormSwitch')">
        Login here
      </nuxt-link>
    </div>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
const noSpaces = (v) => !(v || '').includes(' ')
/* eslint-disable */
const lettersOnly = (v) => /^[a-z\u0590-\u05fe]+$/i.test(v)

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
      firstName: null,
      lastName: null,
    }
  },
  validations: {
    firstName: { required, lettersOnly, noSpaces, minLength: minLength(2) },
    lastName: { required, lettersOnly, noSpaces, minLength: minLength(2) },
    email: { required, email },
    password: { required, minLength: minLength(8), validPassword },
  },
  computed: {
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return []
      !this.$v.firstName.required && errors.push('This field is required')
      !this.$v.firstName.noSpaces &&
        errors.push('Spaces are not allowed in this field')
      !this.$v.firstName.lettersOnly &&
        errors.push('This field only accepts letters')
      !this.$v.firstName.minLength &&
        errors.push('You must enter at least 2 characters')

      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return []
      !this.$v.lastName.required && errors.push('This field is required')
      !this.$v.lastName.noSpaces &&
        errors.push('Spaces are not allowed in this field')
      !this.$v.lastName.lettersOnly &&
        errors.push('This field only accepts letters')
      !this.$v.lastName.minLength &&
        errors.push('You must enter at least 2 characters')

      return errors
    },
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
