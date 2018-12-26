<template>
  <div class="section-column">
    <h1 >{{ title }}</h1>
    <div>{{ time }}</div>

    <div>{{ des }}</div>

    <div class="article-content" v-html="content"/>
    <!-- <nav-header :active="active"/> -->
    <!-- <el-row type="flex" justify="center">
      <el-col :span="14" class="detail_title">
        <div>{{ title }}</div>
        <div class="time">发布时间：{{ time }}&nbsp;&nbsp;&nbsp;&nbsp;分类：{{ list === 'Front' ? '前端文章' : '后端文章' }}</div>
      </el-col>

    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="14" class="detail_content">
        <el-card>
          <div v-show="!content">暂无文章数据...</div>
          <div class="md markdown-body" v-html="content"/>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import NavHeader from '~/components/NavHeader.vue'
// import { baseurl } from '~/plugins/url.js'
export default {
  //   components: {
  //     NavHeader
  //   },
  //   data() {
  //     return {
  //       active: 'index'
  //     }
  //   },

  async asyncData({ app, params }) {
    let json = { id: params.id }
    let result = await app.$axios.get(`/article/content/${params.id}`, {
      params: json
    })
    let { error, info } = result.data
    // console.log('info', info)
    if (info && info.length) {
      let { content, des, list, time, title } = info[0]
      return { title, des, content, list, time }
    } else {
      return { title: '', des: '', content: '', list: '', time: '' }
    }
  }
  //   head() {
  //     return {
  //       title: this.title,
  //       meta: [
  //         { hid: 'description', name: 'description', content: `${this.des}` },
  //         { hid: 'author', content: 'brian' }
  //       ]
  //     }
  //   }
}
</script>
<style scoped >
.article-content >>> img {
  display: block;
  max-width: 100%;
}
.section-column {
  width: 100%;
  max-width: 740px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
