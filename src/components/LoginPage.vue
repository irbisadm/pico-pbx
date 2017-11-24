<template>
  <div class="hello">
    <h1>LOGIN</h1>
    <input type="text" v-model="login" placeholder="login"><br>
    <input type="text" v-model="password" placeholder="password"><br>
    <button @click="doLogin">Login</button>
  </div>
</template>

<script>
import Voximplant from "../Voximplant";
export default {
  name: 'LoginPage',
  data () {
    return {
      login:'',
      password:''
    }
  },
  methods:{
    doLogin: function (e) {
      Voximplant.get().login(this.login,this.password)
        .then((response)=>{
          this.$router.push({path:'/'})
        })
        .catch((e)=>{
          console.error(e.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
