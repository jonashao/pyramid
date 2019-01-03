<template>

  <c-card :title="texts.title" :subtitle="texts.subtitle"
          :bottom="texts.bottom">

    <template v-if="state === 'signup'">
      <v-layout column align-center class="auth-buttons">
        <v-btn depressed color="white" @click="googleAuth">
          <google-logo style="padding-right:.5rem;"/>
          Sign up with Google
        </v-btn>
        <v-btn depressed color="white" >
          <google-logo style="padding-right:.5rem;"/>
          Sign up with Facebook
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
        <v-flex xs8> 
          <v-text-field
            label="电子邮箱"
            placeholder=""
          />
        </v-flex>
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
import GoogleLogo from '~/assets/image/google.svg'

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
  components: { CCard, GoogleLogo },
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
    },
    googleAuth() {
      this.$axios.get('/auth/google').then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.row {
  margin: 1rem 0;
}

.auth-buttons {
  button {
    width: 20rem;
    padding: 0 32px;
  }
  /deep/.v-btn__content {
    flex: 1;
    justify-content: flex-start;
  }
}
</style>
