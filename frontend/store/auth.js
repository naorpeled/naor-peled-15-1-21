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
  async fetchUserData({ commit }) {
    const data = await this.$axios.$get('/users/me')
    commit({ type: 'setUserData', data })
    commit({ type: 'setLoggedIn', flag: true })
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
