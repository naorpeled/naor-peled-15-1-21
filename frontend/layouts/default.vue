<template>
  <v-app>
    <v-main class="deep-purple darken-1">
      <v-container class="white elevation-10">
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
}
</script>

<style lang="scss" scoped>
body {
}

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
