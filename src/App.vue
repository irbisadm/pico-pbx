<template lang="pug">
  el-container#app
    el-header.ppbx_header
      el-row
        el-col(:span="4",:md="12",:sm="12",:xs="20")
          .ppbx_logo Pico PBX
    router-view
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {},
    components: {}
  })
  export default class App extends Vue{

  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Ubuntu|Ubuntu+Mono');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ppbx_logo{
    font-size: 2em;
    line-height: 60px;
  }
  .ppbx_header{
    box-sizing: border-box;
    border-bottom: solid 1px #e6e6e6;
  }
</style>
