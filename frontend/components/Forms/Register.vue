<template>
  <v-form>
    <span class="text-xl">Please fill all the fields below</span>
    <v-text-field label="First Name" />
    <v-text-field label="Last Name" />
    <v-text-field label="E-mail" />
    <v-text-field label="Password" />
    <v-btn>Register</v-btn>
    <div>
      <span>Already have account?</span>
      <v-btn text @click="$emit('onFormSwitch')">Login here</v-btn>
    </div>
  </v-form>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
