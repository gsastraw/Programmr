<template>
    <div>
        <div class="background">
        <b-img class="logo" :src="require('../assets/squarelogo.svg')"></b-img>
        <Sidebar/>
        <div class="body">
        <h1>About Programmr</h1>
        <p>We are an awesome team making an programming meetup website!</p>
        <p>Made by:</p>
        <p>Mislav Milicevic</p>
        <p>Gregory Sastrawidjaya</p>
        <p>Klara Svensson</p>
      </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
  name: 'About',
  components: {
    Sidebar
  },
  methods: {
    home() {
      this.$router.push('/').catch(error => {
        console.log(error)
      })
    }
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
.body {
    color: white;
    text-align: center;
    padding: 20px;
    background: rgba(114,204,255,0.23);
    margin-top: 100px;
}
h1 {
    padding-top: 40px;
    text-align: center;
    font-weight: bold;
}
p {
    padding: 10px;
    text-align: center;
}

</style>
