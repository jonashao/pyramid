<template>
  <div class="post-card">
    <v-layout row>
      <v-flex xs8 sm9>
          
        <div>
          <div class="topic subtitle">{{ post.topic.name }} </div>
          <nuxt-link :to="`/post/${post._id}`">  
            <div class="headline" style="margin-top:.5rem;margin-bottom:.5rem">{{ post.title }}</div>
            <div class="des " >{{ post.des }}</div>
          </nuxt-link>
        </div>
         
      </v-flex>
      <v-flex xs5 sm3>
        <nuxt-link :to="`/post/${post._id}`">  
          <v-img v-if="post.image" 
                 :src="post.image.url"
                 :alt="post.image.name"
                 height="125px"
                 width="125px"
                 style="max-width:100%"
          />
        </nuxt-link>
      </v-flex>
    </v-layout>
    <v-divider light/>
    <!-- <v-card-actions class="pa-3">
          Rate this album
          <v-spacer/>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
          <v-icon>star_border</v-icon>
        </v-card-actions> -->
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>



<style scoped>
.post-card {
  max-width: 100%;
  width: 700px;
  margin-bottom: 1rem;
}
.v-card__title a {
  text-decoration: none;
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
  color: rgba(0, 0, 0, 0.54) !important;
  fill: rgba(0, 0, 0, 0.54) !important;
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
