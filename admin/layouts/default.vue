<template>
  <v-app >
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
     
      <v-toolbar-title v-text="title"/>
     
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
        <v-snackbar v-model="snackbarShow" >
          {{ snackbar.text }}
          <v-btn dark flat @click="snackbarShow = false" >
            好的
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'apps', title: '欢迎', to: '/admin' },
        { icon: 'bubble_chart', title: '文章', to: '/admin/article' },
        { icon: 'bookmark', title: '列表', to: '/admin/topic' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Blog管理系统',
      snackbarShow: false
    }
  },
  computed: {
    snackbar: {
      get: function() {
        return this.$store.state.snackbar
      }
    }
  },
  watch: {
    snackbarShow(newvalue, oldvalue) {
      console.log('snackbar show status')
      if (newvalue !== oldvalue) {
        this.$store.commit('snackbar/setState', { show: newvalue })
      }
    }
  },
  created() {
    this.$store.watch(
      state => state.snackbar.snackbar,
      () => {
        console.log('state change', this.$store.state.snackbar)
        if (this.snackbarShow !== this.$store.state.snackbar.snackbar)
          this.snackbarShow = this.$store.state.snackbar.snackbar
      }
    )
  }
}
</script>
