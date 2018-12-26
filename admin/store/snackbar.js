export const state = () => ({
  snackbar: false,
  y: 'top',
  x: null,
  mode: '',
  timeout: 6000,
  text: "Hello, I'm a snackbar"
})

export const mutations = {
  setState(state, { show, y, x, mode, timeout, text }) {
    state.snackbar = show
    // state.y = y
    // state.x = x
    // state.mode = mode
    // state.timeout = timeout
    if (text) {
      state.text = text
    }
    console.log('set state', state)
  }
}
