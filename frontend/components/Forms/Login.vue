<template>
  <v-form>
    <span class="text-xl">Enter your credentials below in order to login</span>
    <v-text-field label="E-mail" />
    <v-text-field label="Password" />
    <v-btn>Login</v-btn>
    <div>
      <span>New account?</span>
      <v-btn text @click="$emit('onFormSwitch')">Register here</v-btn>
    </div>
  </v-form>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
