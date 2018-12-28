<template>
  <v-app>
    <div style="height:56px">
      <v-layout justify-center>
        <v-btn :to="'/'" flat>
          {{ title }}
        </v-btn>
      </v-layout>
    </div>
    <v-content>
      <v-container align-center justify-center row fill-height fill-width>
        <nuxt />
      </v-container>
    </v-content>


  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' }
        // { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Jonas' Blog"
    }
  }
}
</script>

<style>
.container {
  margin-left: auto;
  margin-right: auto;
}
</style>
