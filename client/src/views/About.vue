<template>
    <div class="body">
        <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
        <h1>About Programmr</h1>
        <p>We are an awesome team making an awesome dating app!</p>
        <b-button class="home-button" v-on:click="mainmenu()">home();</b-button>
    </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    mainmenu() {
      this.$router.push('/').catch(error => {
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>
.home-button {
    background-color: #72CCFF;
    padding: 20px;
}
.body {
    color: white;
    text-align: center;
    padding: 20px;
}
h1 {
    padding-top: 40px;
    text-align: center;
}
p {
    padding: 10px;
    text-align: center;
}

</style>
