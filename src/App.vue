<template lang="pug">
  el-container#app
    el-header
      el-row
        el-col(:span="4") Pico PBX
    el-main
      router-view
    el-footer
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu|Ubuntu+Mono');

body{
  margin:0;
  padding:0;
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
