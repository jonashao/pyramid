<template>
  <v-app>
 
    <v-toolbar dense color="white" style="position:sticky" 
               scroll-off-screen 
               app >
      <!-- <v-toolbar-side-icon @click="drawer = !drawer" /> -->
      <v-layout justify-space-around>
        <v-flex xs12 sm8 md6>
          <v-btn :to="'/'" flat>
            {{ title }}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer >
      <p>&copy; 2019 <br></p><br>
      <p>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "Jonas' Blog",
      currentItem: 'tab-Web',
      items: ['Web', 'Shopping', 'Videos', 'Images']
    }
  }
}
</script>
<style>
.v-toolbar {
  box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.2);
}
</style>
