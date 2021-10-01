<template>
<div>
    <Sidebar/>
    <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <!--<h1>Profile for user id: {{ $route.params.id }}</h1>-->
    <profile-item v-bind:user="users"/>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import ProfileItem from '../components/ProfileItem.vue'

export default {
  name: 'profile',
  components: {
    'profile-item': ProfileItem,
    Sidebar
  }
}
</script>

<style scoped>
h1 {
    color: white;
    font-weight: bold;
}
</style>
