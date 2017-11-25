<template lang="pug">
  el-menu(:router="true").leftMenu
    el-menu-item(index="/history")
      i.el-icon-phone
      span Call History
    el-menu-item(index="/users")
      i.el-icon-service
      span Users
    el-menu-item(index="/routing")
      i.el-icon-setting
      span Incomming routing
</template>

<style scoped>
  .leftMenu{
    display: inline-block;
    text-align: left;
    width: 199px;
    min-height: calc(100vh - 60px);
  }
</style>

<script>
  export default {
    name: 'LeftMenu',
    data (){
      return {};
    }
  }
</script>
