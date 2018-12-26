<template>
  <div>
    <div class="text-xs-center" style="margin-bottom:1rem"> 
      <v-btn v-for="c in categories" :key="c._id" 
             :dark="c._id===selectedCategory"
             :color="c._id===selectedCategory? c.color?c.color:'dark':null" round @click="filter(c)">
        {{ c.name }}</v-btn>
      <v-btn round to="/admin/category/list">更多</v-btn>
    </div>
    <v-layout row wrap type="flex" justify="center">
 
      <v-flex xs24>
        <!-- <h2 style="margin-bottom:0.5%;">前端文章:</h2> -->
        <v-data-table
          :headers="headers"
          :items="articles"
          :pagination.sync="pagination"
          :total-items="totalarticles"
          :loading="loading"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item._id }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.time }}</td>
            <td>{{ props.item.des }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
   

    </v-layout>

    <v-btn
      dark
      fab
      fixed
      bottom
      right
      to="/admin/article"
    >
      <v-icon>add</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      totalarticles: 0,
      articles: [],
      selectedCategory: null,
      loading: true,
      pagination: {},
      headers: [
        { text: 'Id', value: '_id' },

        {
          text: '标题',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: '发表日期', value: 'time' },
        { text: '简述', value: 'des' },
        { text: '操作', value: 'name', sortable: false }
      ]
    }
  },
  computed: mapState({
    // 传字符串参数 'count' 等同于 `state => state.count`
    categories: state => state.category.all
  }),
  watch: {
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          if (data) {
            this.articles = data.list
            this.totalarticles = data.count
          }
        })
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi()
    this['category/fetch']()
  },
  methods: {
    ...mapActions([
      'category/fetch', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    moreCategories() {
      this.$router.push({ name: 'admin-category-list' })
    },
    filter(category) {
      this.selectedCategory = category._id
      this.getDataFromApi()
    },
    getDataFromApi() {
      this.loading = true
      const { sortBy, descending, page, rowsPerPage } = this.pagination

      return this.$axios
        .get(
          `/article/list${
            this.selectedCategory ? '/' + this.selectedCategory : ''
          }`,
          {
            params: { page, pageSize: rowsPerPage }
          }
        )
        .then(({ status, data }) => {
          this.loading = false
          if (status === 200 && data.error === 0) {
            return data
          } else {
            return []
          }
        })
        .then(data => {
          this.articles = data.list
          this.totalarticles = data.count
        })
    },

    editItem(item) {
      this.editedIndex = this.articles.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedIndex)
      this.$router.push({
        name: 'admin-article-id',
        params: { id: this.editedItem._id }
      })
    },

    deleteItem(item) {
      const index = this.articles.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.doDeleteItem(item)
    },

    doDeleteItem(item) {
      console.log(item)
      this.$axios.post(`/article/del/${item._id}`).then(({ data, status }) => {
        if (status === 200 && data.ok === 1) {
          this.getDataFromApi()
          this.$store.commit('snackbar/setState', {
            show: true,
            text: '您成功删除一篇文章'
          })
        }
      })
    }
  }
}
</script>
