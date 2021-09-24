<template>
<b-navbar toggleable="lg" fixed="top" type="dark" variant="dark">
  <b-navbar-brand href="#">
      <b-img class='logo' :src="require('../assets/squarelogo.svg')"></b-img>
      Welcome
  </b-navbar-brand>
  <b-navbar-toggle target="nav-collapse">
  </b-navbar-toggle>

  <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav align="center">
        <b-nav-item to='/mainmenu'>findMatch();</b-nav-item>
        <b-nav-item href="/profile">myProfile();</b-nav-item>
        <b-nav-item href="/matches">chat();</b-nav-item>
        <b-nav-item href="/">signOut();</b-nav-item>
      </b-navbar-nav>
  </b-collapse>
  </b-navbar>

</template>

<script>

export default {
  components: {

  }
}

</script>

<style scope>
.logo {
    width: 15%;
    align-items: center;
    height: auto;
}
</style>
