import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainMenu from './views/MainMenu.vue'
import Profile from './views/Profile.vue'
import Matches from './views/Matches.vue'
import EditProfile from './views/EditProfile.vue'
import Inbox from './views/Inbox.vue'

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
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/matches',
      name: 'matches',
      component: Matches
    },
    {
      path: '/profile/edit',
      name: 'edit',
      component: EditProfile
    },
    {
      path: '/matches/chat/:matchId',
      name: 'inbox',
      component: Inbox,
      props: true
    }
  ]
})

export default router
