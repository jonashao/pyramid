export const state = () => ({
  all: []
})

export const mutations = {
  setCategoryList(state, list) {
    state.all = list
    console.log('category all', state)
  }
}

export const actions = {
  async fetch({ commit }) {
    const { data, status } = await this.$axios.get('/category/list')
    console.log('list', data)
    if (status === 200 && !data.error) {
      commit('setCategoryList', data.list)
    }
  }
}
