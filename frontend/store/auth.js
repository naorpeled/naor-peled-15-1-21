export const state = () => ({
  user: null,
  loggedIn: false,
})

export const mutations = {
  setLoggedIn(state, { flag }) {
    state.loggedIn = flag
  },
  setUserData(state, { data }) {
    state.user = data
  },
}

export const actions = {
  async fetchUserData({ commit, dispatch }) {
    const data = await this.$axios.$get('/users/me')
    commit({ type: 'setUserData', data })
    commit({ type: 'setLoggedIn', flag: true })
    await dispatch('messages/fetchSentMessages', {}, { root: true })
    await dispatch('messages/fetchReceivedMessages', {}, { root: true })
  },
  async attemptRegistration(
    { dispatch },
    { firstName, lastName, email, password }
  ) {
    try {
      /* eslint-disable */
      await this.$axios.$post('/auth/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
      dispatch({ type: 'fetchUserData' })
    } catch (error) {
      if (error.response) throw { type: 'conflict' }
      throw { type: 'internal' }
    }
  },
  async attemptLogin({ dispatch }, { email, password }) {
    try {
      await this.$axios.$post('/auth/login', {
        email,
        password,
      })
      dispatch({ type: 'fetchUserData' })
    } catch (error) {
      throw new Error('Unauthorized')
    }
  },
}
