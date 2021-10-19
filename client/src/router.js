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
      path: '/mainmenu/:userId',
      name: 'mainmenu',
      component: MainMenu,
      props: true
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: Profile,
      props: true
    },
    {
      path: '/profile/edit/:userId',
      name: 'edit',
      component: EditProfile,
      props: true
    },
    {
      path: '/matches/:userId',
      name: 'matches',
      component: Matches,
      props: true
    },
    {
      path: '/matches/chat/:userId/:matchId',
      name: 'inbox',
      component: Inbox,
      props: true
    }
  ]
})

export default router
