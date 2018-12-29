<template>
  <div class="section-column">
    <div class="title-block">
      <div class="text-xs-center desc">{{ time }}</div>
      <h1 class="text-xs-center">{{ title }}</h1>

      <div class="desc text-xs-center">{{ des }}</div>
    </div>
 
    <v-img v-if="image" 
           :src="image.url"
           :alt="image.name"
           contain />

    <div class="article-content" v-html="content"/>
    <div v-if="originUrl"><span>转载自:</span>
      <a :href="originUrl" target="_blank" style="color:green; font-weight:bold;word-break: break-word;">{{ originUrl }}</a> 
    </div>
    <div class="comments" style="margin-top:5rem">
      <div class="comment-box">
        <h2>评论</h2>
        <v-card>
          <v-card-title>          
            <nuxt-link to="/signin">  写评论... </nuxt-link>
          </v-card-title>
        </v-card>
        <!-- <v-form style="margin-top:1rem">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                v-model="first"
                disabled
                solo>
                <div slot="label">
                  <nuxt-link to="signin">  写评论... </nuxt-link>
                
                </div>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-form> -->
      </div>

    </div>
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
    // console.log('info', info)
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
  margin: 2rem 0;
  font-size: 1.25rem;
  color: rgb(128, 128, 128);
}
</style>
