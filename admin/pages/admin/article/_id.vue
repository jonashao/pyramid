<template>
  <v-layout row>
    <v-flex xs19>

      <v-text-field
        v-model="article.title"
        :rules="nameRules"
        :counter="200"
        label="撰写新文章" placeholder="在此输入文章标题" name="title" class="article_title"
        required
      />

      <v-text-field
        v-model="article.des"
        :rules="nameRules"
        :counter="200"
        label="文章简介" placeholder="在此输入文章简介" name="title" class="article_title"
        required
      />

      <v-select
        v-model="article.category"
        :items="categorys"
        item-text="name"
        item-value="_id"
        label="文章集合"
      />
   
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="article.date"
          label="Birthday date"
          prepend-icon="event"
          readonly
        />
        <v-date-picker
          ref="picker"
          v-model="article.date"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="save"
        />
      </v-menu>

  

      <mavon-editor v-model="article.content" class="article_content" font-size="18px" placeholder="开始编写文章内容..." 
                    style="min-height:600px;max-height:80vh" 
                    @change="changeContent" />
      <v-btn type="success" class="article_button" @click="submitArticle">发布文章</v-btn>
    </v-flex>


  
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      menu: false,
      article: {
        title: '',
        content: '',
        htmlContent: '',
        date: FormatDate(new Date()),
        category: '',
        contentValue: '',
        des: '',
        original: '',
        id: ''
      },
      img: {
        path: '',
        filename: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 100 || 'Name must be less than 200 characters'
      ]
    }
  },
  computed: mapState({
    // 传字符串参数 'count' 等同于 `state => state.count`
    categorys: state => state.category.all
  }),
  created() {
    this.init()
  },
  mounted() {
    if (this.categories === undefined || !this.categories.length) {
      this['category/fetch']()
    }
  },

  methods: {
    ...mapActions([
      'category/fetch' // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    ]),
    save(date) {
      this.$refs.menu.save(date)
    },
    init() {
      let id = this.$route.params.id
      if (!id) {
        return
      }
      this.$axios
        .get(`/article/content/${id}`, { params: { id } })
        .then(({ data }) => {
          // console.log('res', res)
          let {
            info: [{ _id, title, des, original, time, list, category }]
          } = data
          console.log(data)
          Object.assign(this.article, {
            id: _id,
            title,
            des,
            content: original,
            date: time ? time : FormatDate(new Date()),
            category: list,
            category
          })
          this.defaultRequest()
        })
    },
    changeContent(value, render) {
      this.article.htmlContent = render
      this.article.original = value
    },
    submitArticle() {
      this.insertArticle()
    },
    dateContent(val) {
      this.date = FormatDate(val)
    },
    error(title, content, nodesc) {
      this.$store.commit('snackbar/setState', { show: true, text: title })

      // this.$Notice.error({
      //   title: title,
      //   desc: nodesc ? '' : content
      // })
    },
    success(title, content, nodesc) {
      this.$store.commit('snackbar/setState', { show: true, text: title })
      // $Notice.success({
      //   title: title,
      //   desc: nodesc ? '' : content
      // })
    },

    insertArticle() {
      if (this.article.title == '') {
        this.error('文章标题留空无法保存', '请仔细检查文章标题', false)
      } else {
        this.$axios.post(`/article/save`, this.article).then(res => {
          let { error } = res.data
          if (Object.is(error, 0)) {
            this.success('文章发布成功', '', true)
            ;[this.title, this.des, this.original, this.content] = ['']
          } else {
            this.error('发布失败', '未知原因', false)
          }
        })
      }
    },
    async defaultRequest() {
      /* 获取显示图片 */
      // let {
      //   data: { result }
      // } = await this.$axios.post('/findOneArticle', {
      //   id: this.$route.params.id,
      //   category: this.article.category
      // })
      // if (Object.is(result.banner, undefined)) {
      //   Object.assign(this.img, { path: '', filename: '' })
      // } else {
      //   Object.assign(this.img, {
      //     path: result.banner,
      //     filename: result.imgFileName
      //   })
      // }
    }
  }
}
/*封装格式化日期*/
function FormatDate(strTime) {
  var date = new Date(strTime)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}
</script>
