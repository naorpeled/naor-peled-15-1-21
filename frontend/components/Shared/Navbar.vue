<template>
  <nav class="d-flex flex-column flex-md-row align">
    <v-btn color="purple lighten-2" to="/compose" nuxt>
      <v-icon class="mr-2">mdi-pencil</v-icon> Compose
    </v-btn>
    <v-tabs centered>
      <v-tab to="/" nuxt exact>
        <v-icon class="mr-2">mdi-inbox</v-icon>Inbox
      </v-tab>
      <v-tab to="/?messagesType=sent" nuxt exact>
        <v-icon class="mr-2">mdi-send</v-icon>Sent
      </v-tab>
    </v-tabs>
    <v-btn @click="logout">
      <v-icon class="mr-2">mdi-logout</v-icon> Logout
    </v-btn>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch({
        type: 'auth/attemptLogout',
      })
    },
  },
}
</script>

<style lang="scss">
nav {
  width: 100%;
}
</style>
