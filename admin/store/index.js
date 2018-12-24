export const state = () => ({
  tokenName: ''
})

export const mutations = {
  setUserName(state, userName) {
    state.tokenName = userName
  }
}
