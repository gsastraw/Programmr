<template>
  <div class="background">
    <b-img class="logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <Sidebar/>
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
.logo {
  position: fixed;
  left: 1%;
  width: 100px;
  top: 1%;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: scroll;

  background: url("../assets/loginbackground.svg") no-repeat center center fixed;;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
@media screen and (min-width: 768px) {
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;

  background: url("../assets/loginbackground.svg") no-repeat center center fixed;;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
}
</style>
