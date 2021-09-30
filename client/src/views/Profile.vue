<template>
<div>
    <Sidebar/>
    <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <!--<h1>Profile for user id: {{ $route.params.id }}</h1>-->
    <profile-item/>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import ProfileItem from '../components/ProfileItem.vue'
import { Api } from '@/Api'

export default {
  name: 'profile',
  components: {
    'profile-item': ProfileItem,
    Sidebar
  },
  mounted() {
    Api.get('/users/3')
      .then(response => {
        this.userId = response.data
      })
      .catch(error => {
        this.userId = []
        console.log(error)
      })
  },
  data() {
    return {
      profile: []
    }
  }
}

</script>
<style scoped>
h1 {
    color: white;
    font-weight: bold;
}
</style>
