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
}
