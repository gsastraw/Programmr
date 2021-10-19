<template>
  <div>
    <b-img class="burger-menu" v-b-toggle.sidebar :src="require('../assets/burgermenu.svg')"></b-img>
    <b-sidebar class="sidebar" id="sidebar"
    width="240px"
    :right="true"
    :backdrop="true"
    shadow="lg"
    bg-variant="dark">
    <b-img class="navbar-logo" v-b-toggle.sidebar :src="require('../assets/squarelogo.svg')"></b-img>
      <b-link class="router-text" :to="{ name: 'mainmenu', params: { userId: this.$route.params.userId }}">mainMenu<span>( );</span></b-link>
      <b-link class="router-text" :to="{ name: 'matches', params: { userId: this.$route.params.userId }}">matches<span>( );</span></b-link>
      <b-link class="router-text" :to="{ name: 'profile', params: { userId: this.$route.params.userId }}">myProfile<span>( );</span></b-link>
      <b-link class="router-text" :to="'/'">logOut<span>( );</span></b-link>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    // userId: Number
  }
}
</script>

<style>
.sidebar {
  display: flex;
  justify-content: center;
}
.navbar-logo {
  position: relative;
  top: -25px;
  width: 96px;
  height: 160px;
}
.sidebar-text {
  color: white;
  font-weight: normal;
  font-size: 1.45em;
}
.router-text {
  top: -20px;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 16px 5px;
  color: white;
  /* font-family: Arial, Helvetica, sans-serif; */
  font-weight: lighter;
  font-size: 25px;
  line-height: 30px;
}
span {
  color: #A394FB;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
  font-size: 25px;
}
.burger-menu {
  position: relative;
  width: 75px;
  height: 55px;
  left: 45%;
  top: 25px;
  outline: 0;
  border: none;
}
.back-button {
  position: relative;
  top: -40px;
  width: 72px;
  height: 120px;
  padding: 12px;
}
@media only screen and (max-width: 768px) {
    .burger-menu {
    position: relative;
    width: 75px;
    height: 55px;
    left: 40%;
    top: 25px;
    outline: 0;
    border: none;
  }
}
</style>
