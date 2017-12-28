<template lang="pug">
  el-container
    el-aside(width="200px")
      LeftMenu
    el-main
      h1 RoutingPage
</template>

<script lang="ts">
  import LeftMenu from '@/components/LeftMenu.vue'
  import Vue from "vue";
  import Component from 'vue-class-component'

  @Component({
    props: {},
    components: {
      LeftMenu
    }
  })
  export default class RoutingPage extends Vue {

  }
</script>

<style scoped>

</style>
