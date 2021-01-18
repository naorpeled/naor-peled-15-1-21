export default async function ({ store, route, redirect }) {
  const isAuthenticated = store.state.auth.loggedIn
  if (!isAuthenticated) {
    try {
      await store.dispatch('auth/fetchUserData')
      return true
    } catch (e) {
      return route.path === '/' ? true : redirect('/')
    }
  }
}
