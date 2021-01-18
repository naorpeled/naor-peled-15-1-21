<template>
  <div v-if="!isLoggedIn" class="text-center">
    <h1 class="text-4xl main--text">Welcome to my messaging app</h1>
    <h2>In order to perform any actions you must have an account</h2>
    <component
      :is="getWelcomeFormType"
      id="index-form"
      @onFormSwitch="switchFormType"
    />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      formType: 'login',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn
    },
    getWelcomeFormType() {
      return this.formType === 'login'
        ? () => import('@/components/Forms/Login')
        : () => import('@/components/Forms/Register')
    },
  },
  methods: {
    switchFormType() {
      this.formType = this.formType === 'login' ? 'register' : 'login'
    },
  },
}
</script>

<style lang="scss" scoped>
#index-form {
  margin: auto;
  height: 100%;
  width: 34%;
}
</style>
