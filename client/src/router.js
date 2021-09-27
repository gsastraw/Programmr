import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainMenu from './views/MainMenu.vue'
import About from './views/About.vue'
import Profile from './views/Profile.vue'

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
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})

export default router
