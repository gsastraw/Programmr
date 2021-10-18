<template>
<div class="background">
  <b-img class="logo" :src="require('../assets/squarelogo.svg')"></b-img>
  <Sidebar/>
  <div class="cardview-position">
    <CardView :userID=1>
    </CardView>
    </div>
</div>

</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import CardView from '../components/CardView.vue'

export default {
  components: {
    Sidebar,
    CardView
  },
  mounted() {
  },
  methods: {
  }
}

</script>

<style scoped>
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
