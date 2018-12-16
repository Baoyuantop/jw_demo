import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Logup from '@/views/logup'
import Main from '@/views/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/logup',
      name: 'Logup',
      component: Logup
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
