<template>
  <v-app>
    <v-main class="deep-purple darken-1">
      <v-container class="white elevation-10">
        <navbar v-if="isLoggedIn" class="mb-5" />
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn
    },
  },
  created() {
    if (!this.$store.state.user) {
      if (!this.$store.state.loggedIn) return false
      this.$store.dispatch({ type: 'fetchUserData' })
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80vw;
  height: 75vh;

  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
