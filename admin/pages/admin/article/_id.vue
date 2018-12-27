<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          v-model="article.title"
          :rules="nameRules"
          :counter="200"
          label="撰写新文章" placeholder="在此输入文章标题" name="title" class="article_title"
          required
        />
      </v-flex>
      <v-flex xs12>
        <mavon-editor ref="md" v-model="article.content" 
                      class="article_content" font-size="18px" 
                      placeholder="开始编写文章内容..." 
                      style="min-height:600px;max-height:80vh" @imgAdd="imgAdd"
                      @change="changeContent" />
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="article.author"
          :counter="100"
          label="作者" placeholder="在此输入文章作者" name="author"
        />
      </v-flex>
      <v-flex xs12>
        <v-textarea
          v-model="article.des"
          :counter="250"
          outline
          label="文章简介" placeholder="在此输入文章简介" name="description"
        />
      </v-flex>

      <v-flex v-if="article.image" xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
        <img v-if="article.image &&article.image.url" :src="article.image.url" height="150">
        <v-text-field v-model="article.image.name" label="Select Image" prepend-icon="attach_file" @click="pickFile"/>
        <input
          ref="image"
          type="file"
          style="display: none"
          accept="image/*"
          @change="onFilePicked"
        >
      </v-flex>
      <v-flex xs12 md6>
        <v-select
          v-model="article.category"
          :items="categorys"
          item-text="name"
          item-value="_id"
          label="文章集合"
        />
      </v-flex>
      <v-flex xs12 md6>

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
            label="发表日期"
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
      </v-flex>
  
      <v-flex xs12>
        <v-text-field
          v-model="article.originUrl"
          :counter="300"
          solo clearable
          label="原文地址" placeholder="如非原创,在此输入原文地址" name="originUrl"
        />
      </v-flex>
    </v-layout>
    <v-btn
      dark
      fab
      fixed
      color="pink"
      bottom
      right
      @click="submitArticle">
      <v-icon>send</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      menu: false,
      imageName: '',
      imageFile: '',
      imageUrl: '',
      article: {
        title: '',
        author: '',
        content: '',
        htmlContent: '',
        date: FormatDate(new Date()),
        category: '',
        contentValue: '',
        des: '',
        original: '',
        originUrl: '',
        id: '',
        image: {
          name: '',
          url: ''
        }
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
          this.article = data.info[0]
          this.article.date = this.article.time ? this.article.time : new Date()
          this.article.id = this.article._id
          this.article.content = this.article.original
          if (!this.article.image) {
            this.article.image = { name: '', url: '' }
          }
          console.log('article', this.article)
          // let {
          //   info: [
          //     {
          //       _id,
          //       title,
          //       author,
          //       originUrl,
          //       des,
          //       original,
          //       time,
          //       list,
          //       category
          //     }
          //   ]
          // } = data
          // console.log(data)
          // Object.assign(this.article, {
          //   id: _id,
          //   title,
          //   des,
          //   content: original,
          //   date: time ? time : FormatDate(new Date()),
          //   category: list,
          //   category
          // })
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
      } else if (!this.article.category) {
        this.error('请选择文章分类', false)
      } else {
        this.$axios.post(`/article/save`, this.article).then(res => {
          let { error } = res.data
          if (Object.is(error, 0)) {
            this.$router.push({ name: 'admin-category' })
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
    },
    imgAdd(pos, file) {
      var formdata = new FormData()
      // formdata.append('image', $file)
      this.$cos.cUploadFile({ file }).then(location => {
        this.$refs.md.$img2Url(pos, location)
      })
      // axios({
      //   url: 'server url',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }).then(url => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   // $vm.$img2Url 详情见本页末尾
      //   $vm.$img2Url(pos, url)
      // })
    },
    pickFile() {
      this.$refs.image.click()
    },

    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.$cos.cUploadFile({ file: files[0] }).then(location => {
            this.imageUrl = location
            this.article.image = {
              url: this.imageUrl,
              name: files[0].name
            }
            console.log('article', this.article)
          })

          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  }
}
/*封装格式化日期*/
function FormatDate(strTime) {
  var date = new Date(strTime)
  // return date
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
</script>
