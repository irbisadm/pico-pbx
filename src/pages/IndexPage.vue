<template lang="pug">
  el-container
    el-aside(width="200px")
      LeftMenu
    el-main
      h1 IndexPage
</template>

<script>
  import LeftMenu from '@/components/LeftMenu'
  export default {
    name: 'IndexPage',
    components:{LeftMenu},
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
