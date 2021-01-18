<template>
  <div class="text-center">
    <h1 class="text-4xl main--text">Compose a message</h1>
    <h2>Here you can compose and send messages to other users</h2>
    <v-form id="compose-form" class="mx-auto" @submit.prevent="sendMessage">
      <v-autocomplete
        v-model.lazy="receiver"
        type="text"
        label="Receiver"
        :error="receiverErrors.length != 0"
        :error-messages="receiverErrors"
        :items="users"
        item-value="id"
        :item-text="
          (user) => `${user.id} - ${user.first_name} ${user.last_name}`
        "
        :auto-select-first="false"
        @input="$v.receiver.$touch()"
        @blur="$v.receiver.$touch()"
      >
        <template v-slot:no-data
          ><div class="pa-4">No users found.</div></template
        >
      </v-autocomplete>
      <v-text-field
        v-model.lazy="subject"
        type="text"
        label="Subject"
        :error="subjectErrors.length != 0"
        :error-messages="subjectErrors"
        @input="$v.subject.$touch()"
        @blur="$v.subject.$touch()"
      />
      <v-textarea
        v-model.lazy="content"
        type="text"
        label="Message"
        :error="contentErrors.length != 0"
        :error-messages="contentErrors"
        @input="$v.content.$touch()"
        @blur="$v.content.$touch()"
      />
      <v-btn type="submit"><v-icon class="mr-2">mdi-send</v-icon>Send</v-btn>
    </v-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  middleware: 'auth',
  validations: {
    receiver: { required },
    subject: { required },
    content: { required },
  },
  data: () => {
    return {
      receiver: null,
      subject: null,
      content: null,
      users: [],
    }
  },
  computed: {
    receiverErrors() {
      const errors = []
      if (!this.$v.receiver.$dirty) return []
      !this.$v.receiver.required && errors.push('This field is required')
      return errors
    },
    subjectErrors() {
      const errors = []
      if (!this.$v.subject.$dirty) return []
      !this.$v.subject.required && errors.push('This field is required')
      return errors
    },
    contentErrors() {
      const errors = []
      if (!this.$v.content.$dirty) return []
      !this.$v.content.required && errors.push('This field is required')
      return errors
    },
  },
  async mounted() {
    this.users = await this.$axios.$get('/users')
  },
  methods: {
    sendMessage() {
      if (this.$v.$invalid) return
      const message = {
        receiver: this.receiver,
        subject: this.subject,
        content: this.content,
      }
      console.log(message.receiver)
      this.$store.dispatch('messages/attemptMessageSend', message)
    },
  },
}
</script>

<style lang="scss">
#compose {
  &-form {
    width: 65%;
  }
}
</style>
