import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/IndexPage'
import LoginPage from '@/pages/LoginPage'
import AboutPage from '@/pages/AboutPage'
import UsersPage from '@/pages/UsersPage'
import HistoryPage from '@/pages/HistoryPage'
import RoutingPage from '@/pages/RoutingPage'
import UserDetailPage from '@/pages/UserDetailPage'
import UserEditPage from '@/pages/UserEditPage'
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
      path: '/users/',
      name: 'UsersPage',
      component: UsersPage
    },
    {
      path: '/user/:user_id',
      name: 'UserPage',
      component: UserDetailPage,
      children: [
        {
          path: 'edit',
          component: UserEditPage
        }
      ]
    },
    {
      path: '/history/',
      name: 'HistoryPage',
      component: HistoryPage
    },
    {
      path: '/routing/',
      name: 'RoutingPage',
      component: RoutingPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage
    },

  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path==='/about') {
    next();
    return;
  }
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
