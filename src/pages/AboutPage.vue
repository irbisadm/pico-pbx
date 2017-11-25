<template lang="pug">
  el-container
    el-row
      el-col(:span="18",:offset="6")
        h1 About Pico-PBX
        p Pico-PBX - simple and fast PBX constructor based on Voximplant Cloud API for phone cals.
</template>

<script>
import Voximplant from "../Voximplant";
export default {
  name: 'LoginPage',
  data () {
    return {
      form:{
        login:'',
        password:''
      },
      errorMessage:''
    }
  },
  methods:{
    doLogin: function (e) {
      Voximplant.get().login(this.form.login,this.form.password)
        .then((response)=>{
          this.errorMessage = '';
          this.$router.push({path:'/'})
        })
        .catch((e)=>{
          this.errorMessage = e.message;
        })
    }
  }
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
