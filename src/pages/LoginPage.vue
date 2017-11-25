<template lang="pug">
  .hello
    el-row
      el-col(:span="2",:offset="11",:lg="{span:6,offset:9}",:md="{span:10,offset:7}",:sm="{span:10,offset:7}",:xs="{span:20,offset:2}",)
        h1 LOGIN
        el-form(ref="form",:model="form")
          el-alert(:title="errorMessage",type="error",show-icon,v-if="errorMessage.length>0")
          el-form-item(label="Voximplant login")
            el-input(v-model="form.login")
          el-form-item(label="Voximplant password")
            el-input(v-model="form.password",type="password")
          el-form-item.loginButtonItem
            el-button(@click="doLogin",type="primary") Login
            a.registration(href="https://voximplant.com/sign-up/",target="_blank") Registration
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
    color: #409EFF;
  }
}
</style>
