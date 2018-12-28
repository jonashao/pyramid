<template>
  <v-flex xs12 sm8 md6 lg7>
    <v-card :color="color">
      <v-card-text>
        <v-layout align-center justify-center class="text-sm-center">
          <v-flex xs12 md8 lg7>
            <h1 class="row">{{ title }}</h1>
            <div class="row">{{ subtitle }}</div>
            <slot/>
        
      
            <div v-if="bottom" style="margin-top:5rem">{{ bottom }} </div>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-flex>
</template>
<style scoped>
.v-card {
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}
</style>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    subtitle: {
      default: '',
      type: String
    },
    color: {
      default: '#E8F3EC',
      type: String
    },
    bottom: {
      default: '',
      type: String
    }
  }
}
</script>
<style scoped>
.row {
  margin: 1rem 0;
}
</style>
