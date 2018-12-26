<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex xs12 sm8 md6>
      <v-card v-for="post in posts" :key="post._id" class="post-card">
        <v-card-title class="headline">{{ post.title }}</v-card-title>
        <v-card-text>
          {{ post.des }}
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            :to="`/post/${post._id}`"
            color="primary"
            flat
            nuxt>Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return { posts: [] }
  },
  mounted() {
    this.$axios.get('/article/list/').then(({ data, status }) => {
      console.log(data)
      this.posts = data.list
      console.log(this.posts)
    })
    // 如果存在不需要重复登陆
    // this.$router.push({
    //   name: 'post-id',
    //   params: { id: '5c210c7ccf62ea4d75352133' }
    // })
  }
}
</script>

<style>
.post-card {
  width: 700px;
  margin-bottom: 1rem;
}
</style>
