<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex xs12 sm8 md6>

      <article v-for="post in posts" :key="post._id" class="post-card">
        <v-layout row style="margin-bottom:2rem">
          <v-flex xs8 sm9>
            <div style="padding-right:1rem">
              <div class="topic subtitle">
                <template v-if="post.topic">   
                  {{ post.topic.name }} 
                </template>
              </div>
              <nuxt-link :to="`/post/${post._id}`">  
                <div class="headline" style="margin-top:.5rem;margin-bottom:.5rem">{{ post.title }}</div>
                <div class="des color-second-text" >{{ post.des }}</div>
              </nuxt-link>
              <div style="margin-top:.5rem;margin-bottom:.5rem;font-size:15px">
                {{ post.author }}
                <div class="color-second-text">
                  {{ post.time }}
                </div>
              </div>
            </div>
         
          </v-flex>
          <v-flex v-if="post.image&&post.image.url" xs4 sm3>
            <nuxt-link :to="`/post/${post._id}`">  
              <v-img 
                :src="post.image.url"
                :alt="post.image.name"
                height="125px"
                width="125px"
                contain
                style="max-width:100%;"
              />
            </nuxt-link>
          </v-flex>
        </v-layout>
        <!-- <v-divider light/> -->
        <!-- <v-card-actions class="pa-3">
          Rate this album
          <v-spacer/>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
        </v-card-actions> -->
      </article>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout: 'square',
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return { posts: [] }
  },
  mounted() {
    this.$axios.get('/article/list').then(({ data, status }) => {
      this.posts = data.list
      console.log(this.posts)
    })
  }
}
</script>

<style >
.post-card {
  max-width: 100%;
  width: 700px;
  margin-bottom: 1rem;
}
article a {
  text-decoration: none;
}

.color-second-text {
  color: rgba(0, 0, 0, 0.54) !important;
  fill: rgba(0, 0, 0, 0.54) !important;
}
.headline {
  font-style: normal;
  letter-spacing: 0;
  font-size: 18px !important;
  line-height: 20px !important;
  -webkit-transform: translateY(0.96px);
  transform: translateY(0.96px);
  letter-spacing: -0.17px !important;
  overflow: hidden;
  max-height: 60px;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-weight: 600;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  --x-height-multiplier: 0.342;
  --baseline-multiplier: 0.22;
}
.des {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-height: 1rem; /* fallback */
  max-height: 3rem; /* fallback */
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical;
  font-weight: 400 !important;
  font-style: normal !important;
  letter-spacing: 0 !important;
  font-size: 16px !important;
  line-height: 20px !important;
  --x-height-multiplier: 0.342 !important;
  --baseline-multiplier: 0.22 !important;
}

.subtitle {
  --x-height-multiplier: 0.342 !important;
  --baseline-multiplier: 0.22 !important;
  font-family: medium-content-sans-serif-font, 'Lucida Grande',
    'Lucida Sans Unicode', 'Lucida Sans', Geneva, Arial, sans-serif !important;
  letter-spacing: -0.02em !important;
  font-weight: 400 !important;
  font-style: normal !important;
  letter-spacing: 0 !important;
  font-size: 15px !important;
  line-height: 20px !important;
  -webkit-transform: translateY(1.8px);
  transform: translateY(1.8px);
  letter-spacing: 0.03em !important;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.54) !important;
  fill: rgba(0, 0, 0, 0.54) !important;
}
</style>
