export const state = () => ({
  sentMessages: [],
  receivedMessages: [],
})

export const mutations = {
  setSentMessages(state, { messages }) {
    state.sentMessages = messages
  },
  setReceivedMessages(state, { messages }) {
    state.receivedMessages = messages
  },
}

export const actions = {
  async fetchSentMessages({ commit }) {
    const messages = await this.$axios.$get('/messages')
    commit({ type: 'setSentMessages', messages })
  },
  async fetchReceivedMessages({ commit }) {
    const messages = await this.$axios.$get('/messages?type=received')
    commit({ type: 'setReceivedMessages', messages })
  },
  async attemptMessageSend({ dispatch }, message) {
    try {
      await this.$axios.$post('/messages', {
        ...message,
      })

      await dispatch({ type: 'fetchSentMessages' })
      await dispatch({ type: 'fetchReceivedMessages' })
      this.$router.push('/')
    } catch (e) {
      throw new Error(e)
    }
  },
  async attemptMessageDelete({ dispatch }, messageId) {
    try {
      await this.$axios.$delete(`/messages/${messageId}`)

      await dispatch({ type: 'fetchSentMessages' })
      await dispatch({ type: 'fetchReceivedMessages' })
    } catch (e) {
      throw new Error(e)
    }
  },
}
