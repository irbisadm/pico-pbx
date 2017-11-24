import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import LoginPage from '@/components/LoginPage'
import Voximplant from "../Voximplant";

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
router.beforeEach((to,from,next)=>{
  const authResult = Voximplant.get().checkAuth();
  if(to.path==='/login'&&authResult){
    next('/');
  }else if(to.path!=='/login'&&!authResult){
    next({path:'/login'});
  }else{
    next();
  }
});

export default router;
