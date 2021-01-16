<template>
  <v-form>
    <span class="text-xl">Please fill all the fields below</span>
    <v-text-field label="First Name" />
    <v-text-field label="Last Name" />
    <v-text-field label="E-mail" />
    <v-text-field label="Password" />
    <v-btn class="my-5">Register</v-btn>
    <div>
      <span>Already have account?</span>
      <nuxt-link class="link" to="/" text @click.native="$emit('onFormSwitch')">
        Login here
      </nuxt-link>
    </div>
  </v-form>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
