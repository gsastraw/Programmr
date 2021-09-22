import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainMenu from './views/MainMenu.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/mainmenu',
      component: MainMenu
    }
  ]
})

export default router
