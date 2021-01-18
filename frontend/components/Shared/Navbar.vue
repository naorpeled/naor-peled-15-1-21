<template>
  <nav class="d-flex">
    <v-btn color="purple lighten-2">
      <v-icon class="mr-2">mdi-pencil</v-icon> Compose
    </v-btn>
    <v-tabs>
      <v-tab to="/?messagesType=inbox" nuxt exact
        ><v-icon class="mr-2">mdi-inbox</v-icon>Inbox</v-tab
      >
      <v-tab to="/?messagesType=sent" nuxt exact
        ><v-icon class="mr-2">mdi-send</v-icon>Sent</v-tab
      >
    </v-tabs>
    <v-btn> <v-icon class="mr-2">mdi-logout</v-icon> Logout </v-btn>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
nav {
  width: 100%;
}
</style>
