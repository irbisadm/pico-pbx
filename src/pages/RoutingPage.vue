<template lang="pug">
  el-container
    el-aside(width="200px")
      LeftMenu
    el-main
      h1 RoutingPage
</template>

<script>
  import LeftMenu from '@/components/LeftMenu'
  export default {
    name: 'RoutingPage',
    components:{LeftMenu},
    data() {
      return {}
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
