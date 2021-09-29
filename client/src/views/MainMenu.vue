<template>
<div>
  <b-img class="logo" :src="require('../assets/squarelogo.svg')"></b-img>
  <Sidebar/>
  <div class="cardview-position">
    <CardView/>
  </div>
  <div>
    <b-button v-on:click="swipeLeft()" class="dislike-button">
      <img src="../assets/dislikebutton.svg" alt="Click to dislike a user!" class="dislike-button">
    </b-button>
    <b-button v-on:click="swipeRight()" class="like-button">
      <img src="../assets/likebutton.svg" alt="Click to like a user!" class="like-button">
    </b-button>
  </div>
</div>

</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import CardView from '../components/CardView.vue'

export default {
  components: {
    Sidebar, CardView
  }
}

</script>

<style scope>
.logo {
  position: fixed;
  left: 1%;
  width: 100px;
  top: 1%;
}
.cardview-position {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.like-button {
  position: fixed;
  width: 80px;
  height: 90px;
  top: 87%;
  left: 40%;
}
.dislike-button {
  position: fixed;
  width: 80px;
  height: 90px;
  top: 87%;
  left: 53%;
}

@media screen and (max-width: 768px) {
  body {
    background: url("../assets/mobilebackground.svg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .like-button {
    position: fixed;
    width: 80px;
    height: 90px;
    top: 88%;
    left: 26%;
  }
  .dislike-button {
    position: fixed;
    width: 80px;
    height: 90px;
    top: 88%;
    left: 58%;
  }
}
</style>
