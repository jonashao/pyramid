<template>
  <v-app>
    <v-layout justify-space-around style="max-height:54px">
      <v-flex xs12 sm8 md6>
        <v-btn :to="'/'" flat>
          {{ title }}
        </v-btn>
      </v-flex>
    </v-layout>
    <v-toolbar :clipped-left="clipped" dense color="white" style="position:sticky" 
              
               app >
      <!-- <v-toolbar-side-icon @click="drawer = !drawer" /> -->
      <v-layout justify-space-around>
        <v-flex xs12>
          <v-tabs
            slot="extension"
            v-model="currentItem"
            centered
            fixed-tabs
            show-arrows
            slider-color="green">
            <!-- <v-tabs-slider color="yellow"/> -->
            <v-tab
              v-for="item in items"
              :href="'#tab-' + item"
              :key="item" >
              {{ item }}
            </v-tab>
  
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" >
      <v-layout justify-center>
        <span>&copy; 2019</span>
        <span>
          <a target="_blank" href="http://www.miitbeian.gov.cn/">
            粤ICP备19000494号-1
          </a>
        </span>
      </v-layout>
      
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Jonas' Blog",
      currentItem: 'tab-Web',
      items: ['Web', 'Shopping', 'Videos', 'Images'],
      more: ['News', 'Maps', 'Books', 'Flights', 'Apps'],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>
<style>
.v-toolbar {
  box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.2);
}
footer span {
  margin: 0 1rem;
}
</style>
