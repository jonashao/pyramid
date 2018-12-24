<template>
  <v-layout row>
    <v-flex xs19>

      <v-text-field
        v-model="title"
        :rules="nameRules"
        :counter="10"
        label="撰写新文章" placeholder="在此输入文章标题" name="title" class="article_title"
        required
      />

      <label for="title" class="article">文章简介</label>
      <v-input v-model="des" size="large" placeholder="在此输入文章标题" name="title" class="article_title"/>
      <mavon-editor v-model="content" class="article_content" font-size="18px" placeholder="开始编写文章内容..." 
                    style="min-height:600px;" 
                    @change="changeContent" />
      <v-btn type="success" class="article_button" @click="submitArticle">发布文章</v-btn>
    </v-flex>


    <v-flex xs4 offset-xs1 class="content_right">
      <v-card class="v-card">
        <v-menu
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="发布日期"
            prepend-icon="event"
            readonly
          />
          <v-date-picker v-model="date" @input="menu2 = false"/>
        </v-menu>        
      </v-card>
      <v-card class="v-card">
        <p slot="title">分类目录</p>
        <!-- <RadioGroup v-model="radio" vertical>
          <Radio label="Front">
            <i class="iconfont icon-h5"/>
            <span class="list_menu">前端开发</span>
          </Radio>
          <Radio label="Back">
            <Icon class="iconfont icon-nodejs"/>
            <span class="list_menu">后端开发</span>
          </Radio>
    
        </RadioGroup> -->
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      menu2: false,
      title: '',
      content: '',
      htmlContent: '',
      date: new Date().toISOString().substr(0, 10),
      radio: 'Front',
      des: '',
      originalContent: ''
    }
  },
  methods: {
    changeContent(value, render) {
      this.htmlContent = render
      this.originalContent = value
    },
    submitArticle() {
      this.insertArticle()
    },
    dateContent(val) {
      this.date = FormatDate(val)
    },
    error(title, content, nodesc) {
      this.$Notice.error({
        title: title,
        desc: nodesc ? '' : content
      })
    },
    success(title, content, nodesc) {
      this.$Notice.success({
        title: title,
        desc: nodesc ? '' : content
      })
    },
    insertArticle() {
      let param = {
        title: this.title,
        htmlContent: this.htmlContent,
        date: this.date,
        des: this.des,
        original: this.originalContent,
        radio: this.radio
      }
      if (this.title == '') {
        this.error('文章标题留空无法保存', '请仔细检查文章标题', false)
      } else {
        this.$axios
          .post(`/api/article/insert${this.radio}`, param)
          .then(res => {
            let { error } = res.data
            if (Object.is(error, 0)) {
              this.success('文章发布成功', '', true)
              ;[this.title, this.des, this.original, this.content] = ['']
            } else {
              this.error('发布失败', '未知原因', false)
            }
          })
      }
    }
  }
}
/*封装格式化日期*/
function FormatDate(strTime) {
  var date = new Date(strTime)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}
</script>
