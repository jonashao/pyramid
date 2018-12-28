<template>

  <c-card :title="texts.title" :subtitle="texts.subtitle"
          :bottom="texts.bottom">

    <template v-if="state === 'signup'">
      <v-layout column>
        <v-btn depressed color="white" >
          <img style="width:1rem; margin:0 1rem" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6I0ZCQkIwMDsiIGQ9Ik0xMTMuNDcsMzA5LjQwOEw5NS42NDgsMzc1Ljk0bC02NS4xMzksMS4zNzhDMTEuMDQyLDM0MS4yMTEsMCwyOTkuOSwwLDI1NiAgYzAtNDIuNDUxLDEwLjMyNC04Mi40ODMsMjguNjI0LTExNy43MzJoMC4wMTRsNTcuOTkyLDEwLjYzMmwyNS40MDQsNTcuNjQ0Yy01LjMxNywxNS41MDEtOC4yMTUsMzIuMTQxLTguMjE1LDQ5LjQ1NiAgQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1MThFRjg7IiBkPSJNNTA3LjUyNywyMDguMTc2QzUxMC40NjcsMjIzLjY2Miw1MTIsMjM5LjY1NSw1MTIsMjU2YzAsMTguMzI4LTEuOTI3LDM2LjIwNi01LjU5OCw1My40NTEgIGMtMTIuNDYyLDU4LjY4My00NS4wMjUsMTA5LjkyNS05MC4xMzQsMTQ2LjE4N2wtMC4wMTQtMC4wMTRsLTczLjA0NC0zLjcyN2wtMTAuMzM4LTY0LjUzNSAgYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyOEI0NDY7IiBkPSJNNDE2LjI1Myw0NTUuNjI0bDAuMDE0LDAuMDE0QzM3Mi4zOTYsNDkwLjkwMSwzMTYuNjY2LDUxMiwyNTYsNTEyICBjLTk3LjQ5MSwwLTE4Mi4yNTItNTQuNDkxLTIyNS40OTEtMTM0LjY4MWw4Mi45NjEtNjcuOTFjMjEuNjE5LDU3LjY5OCw3Ny4yNzgsOTguNzcxLDE0Mi41Myw5OC43NzEgIGMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0YxNDMzNjsiIGQ9Ik00MTkuNDA0LDU4LjkzNmwtODIuOTMzLDY3Ljg5NmMtMjMuMzM1LTE0LjU4Ni01MC45MTktMjMuMDEyLTgwLjQ3MS0yMy4wMTIgIGMtNjYuNzI5LDAtMTIzLjQyOSw0Mi45NTctMTQzLjk2NSwxMDIuNzI0bC04My4zOTctNjguMjc2aC0wLjAxNEM3MS4yMyw1Ni4xMjMsMTU3LjA2LDAsMjU2LDAgIEMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" >
          Sign up with Google
        </v-btn>
      </v-layout>
      <v-layout align-center justify-center>
        <span>已经有账号?</span>    
        <v-btn flat small style="color:green" @click="changeState('login')">登录</v-btn>
      </v-layout>
    </template>

    <template v-if="state === 'login'">
      <v-layout column>
        <v-btn depressed color="white" @click="changeState('login-email')" >
          <v-icon >mail_outline</v-icon>
          用邮箱登录
        </v-btn>
      </v-layout>

      <v-layout align-center justify-center>
        <span>还没有账号?</span>    
        <v-btn flat small style="color:green" @click="changeState('signup')">注册</v-btn>
      </v-layout>
    </template>
  
    <template v-if="state === 'login-email'">
      <v-layout column>
        <v-text-field
          label="电子邮箱"
          placeholder=""
        />
      </v-layout>
      
      <v-layout align-center justify-center>
        <span>还没有账号?</span>    
        <v-btn flat small style="color:green" @click="changeState('login-email-success')">确认</v-btn>
      </v-layout>
    </template>
      
    <template v-if="state === 'login-email-success'">
      <div class="row">我们刚刚向{{ email }}发送了一个确认链接,点击这个链接,你将完成登录</div>
     
      
      <v-layout align-center justify-center>
        <v-btn flat small style="color:green" @click="changeState('signup')">好的</v-btn>
      </v-layout>

      <img style="width:15rem" src="https://cdn-images-1.medium.com/proxy/1*D_cuknvGrylhnGWjmEu59w.png">
    </template>
    
  </c-card>
    
</template>

<script>
import CCard from '~/components/column-card.vue'
const TEXTS = {
  signup: {
    title: '创建一个账户',
    subtitle:
      'Build on this story’s ideas with your own – responses keep the conversation moving.',
    bottom:
      'To make Medium work, we log user data and share it with service providers. Click “Sign up” above to accept Medium’s Terms of Service & Privacy Policy.'
  },
  login: {
    title: '欢迎回来!',
    subtitle:
      'Build on this story’s ideas with your own – responses keep the conversation moving.',
    bottom:
      'To make Medium work, we log user data and share it with service providers. Click “Sign up” above to accept Medium’s Terms of Service & Privacy Policy.'
  },
  'login-email': {
    title: '用邮箱登录',
    subtitle: '输入你的账户绑定的邮箱,我们将向你的邮箱发送一个魔术链接'
  },
  'login-email-success': {
    title: '检查你的邮箱'
  }
}

export default {
  layout: 'center',
  components: { CCard },
  data() {
    return {
      state: 'signup',
      email: ''
    }
  },
  computed: {
    texts() {
      return TEXTS[this.state]
    }
  },
  methods: {
    changeState(state) {
      this.state = state
    }
  }
}
</script>

<style scoped>
.row {
  margin: 1rem 0;
}
</style>
