<template>
  <div class="login_images" grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs20>
        <v-card style="float:right;margin-top:20%;">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          />

          <v-card-title primary-title>欢迎登录 </v-card-title>

          <v-form v-model="valid" style="padding:2rem">
            <v-text-field
              :rules="nameRules"
              v-model="username"
              label="Name" 
              type="text" 
              placeholder="请输入用户名" 
              name="username"
              required
            />
            <v-text-field
              v-model="password" 
              type="password" 
              placeholder="请输入密码" 
              name="password"
            />
          </v-form>

          <v-card-actions>
            <v-btn outline color="indigo" type="primary" long @click="login(username,password)">登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  layout: 'full-screen',
  data: () => ({
    username: '',
    password: '',
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),

  computed: {
    ...mapState(['tokenName'])
  },
  mounted() {
    // 如果存在不需要重复登陆
    let storage = window.sessionStorage
    this.setUserName(storage.getItem('username'))
    let store = this.$store.state.tokenName
    if (!store) {
      this.$router.push({ name: 'index' })
    } else {
      this.$router.push({ name: 'admin' })
    }
  },
  methods: {
    // 设置用户名vuex方法
    ...mapMutations(['setUserName']),
    login(username, password) {
      let json = { username, password }
      this.$axios.post('/login', json).then(res => {
        let { error, username, msg } = res.data
        if (Object.is(error, 0)) {
          let storage = window.sessionStorage //初始化sessionStorage
          storage.setItem('username', username)
          this.setUserName(storage.getItem('username'))
          this.$router.push({ name: 'admin' })
        } else if (Object.is(error, 1)) {
          this.error('用户名错误', msg, false)
        } else {
          this.error('密码错误', msg, false)
        }
      })
    },
    error(title, content, nodesc) {
      this.$Notice.error({
        title: title,
        desc: nodesc ? '' : content
      })
    }
  }
}
</script>
<style lang="less">
.login_images {
  width: 100%;
  height: 100vh;
  background: url('~static/images/login.jpeg') no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>
