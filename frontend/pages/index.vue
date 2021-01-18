<template>
  <div v-if="!isLoggedIn" class="text-center">
    <h1 class="text-4xl main--text">Welcome to my messaging app</h1>
    <h2>In order to perform any actions you must have an account</h2>
    <component
      :is="welcomeFormType"
      id="index-form"
      @onFormSwitch="switchFormType"
    />
  </div>
  <div v-else>
    <v-expansion-panels>
      <v-expansion-panel v-for="message in messages" :key="message.id">
        <v-expansion-panel-header>
          <template>
            <v-row no-gutters>
              <v-col cols="4"> Subject: {{ message.subject }} </v-col>
              <v-col cols="8">
                <span>
                  Sent by
                  {{
                    message.sender.first_name + ' ' + message.sender.last_name
                  }}
                  on {{ message.created_at | datePreetify }}
                </span>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>{{ message.content }}</p>
          <v-btn
            v-if="$store.state.auth.user.id === message.sender.id"
            color="red"
            class="white--text"
            small
            @click.prevent="deleteMessage(message.id)"
          >
            <v-icon class="mr-2">mdi-close</v-icon> Delete
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  filters: {
    datePreetify: (date) => {
      return new Date(date).toLocaleDateString('he-IL')
    },
  },
  data: () => {
    return {
      formType: 'login',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn
    },
    welcomeFormType() {
      return this.formType === 'login'
        ? () => import('@/components/Forms/Login')
        : () => import('@/components/Forms/Register')
    },
    messages() {
      if (!this.$store.state.auth.loggedIn) return null
      return this.$route.query.messagesType === 'inbox'
        ? this.$store.state.messages.receivedMessages
        : this.$store.state.messages.sentMessages
    },
  },
  methods: {
    switchFormType() {
      this.formType = this.formType === 'login' ? 'register' : 'login'
    },
    deleteMessage(messageId) {
      this.$store.dispatch('messages/attemptMessageDelete', messageId)
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
