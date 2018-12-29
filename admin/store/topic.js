export const state = () => ({
  all: []
})

export const mutations = {
  setCategoryList(state, list) {
    state.all = list
    console.log('set topic all', state)
  }
}

export const actions = {
  async fetch({ commit }) {
    const { data, status } = await this.$axios.get('/topic/list')
    console.log('list', data)
    if (status === 200 && !data.error && data.list && data.list.length) {
      commit('setCategoryList', data.list)
    }
  }
}
