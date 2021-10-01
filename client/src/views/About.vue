<template>
    <div>
      <b-img class="logo" :src="require('../assets/squarelogo.svg')"></b-img>
      <Sidebar/>
      <div class="body">
        <h1>About Programmr</h1>
        <p>We are an awesome team making an awesome dating app!</p>
        <p>Made by:</p>
        <p>Mislav Milicevic</p>
        <p>Gregory Sastrawidjaya</p>
        <p>Klara Svensson</p>
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
