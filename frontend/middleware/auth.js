export default function ({ store, route, redirect }) {
  if (route.path === '/') return true
  if (!store.state.loggedIn) return redirect('/')
}
