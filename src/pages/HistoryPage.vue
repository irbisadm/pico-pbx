<template lang="pug">
  el-container
    el-aside(width="200px")
      LeftMenu
    el-main
      h1 HistoryPage
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
  export default class HistoryPage extends Vue {

  }
</script>

<style scoped>

</style>
