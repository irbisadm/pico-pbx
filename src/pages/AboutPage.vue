<template lang="pug">
  el-container
    el-row
      el-col(:span="18",:offset="6")
        h1 About Pico-PBX
        p Pico-PBX - simple and fast PBX constructor based on Voximplant Cloud API for phone cals.
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
export default class LoginPage extends Vue {

}
</script>

<style scoped>
.loginButtonItem{
  text-align: right;
  .registration{
    float: left;
  }
}
</style>
