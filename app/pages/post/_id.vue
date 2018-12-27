<template>
  <div class="section-column">
    <div class="title-block">
      <h1 >{{ title }}</h1>
      <div>{{ time }}</div>
      <div v-if="originUrl"><span>转载自:</span><a :href="originUrl" style="color:green; font-weight:bold">{{ originUrl }}</a> </div>
    </div>
 
    <v-img v-if="image" 
           :src="image.url"
           :alt="image.name"
           contain />
    <div class="desc">{{ des }}</div>

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
export default {
  async asyncData({ app, params }) {
    let json = { id: params.id }
    let result = await app.$axios.get(`/article/content/${params.id}`, {
      params: json
    })
    let { error, info } = result.data
    console.log('info', info)
    if (info && info.length) {
      let { content, des, list, time, title, image, originUrl } = info[0]
      return { title, des, content, list, time, image, originUrl }
    } else {
      return {
        title: '',
        des: '',
        content: '',
        list: '',
        time: '',
        image: null
      }
    }
  }
}
</script>
<style scoped >
.article-content >>> img {
  display: block;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.section-column {
  width: 100%;
  max-width: 740px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 600px) {
  .section-column {
    padding-left: 0;
    padding-right: 0;
  }
  .v-image {
    margin-left: -16px;
    margin-right: -16px;
  }
}

.title-block {
  margin-bottom: 1rem;
}

.desc {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: rgb(128, 128, 128);
}
</style>
