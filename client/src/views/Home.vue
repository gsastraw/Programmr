<template>

  <div class="background">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
      <div>{ Welcome to Programmr! }</div>
      <b-button class="button_slide slide_right" v-on:click="mainmenu()">continue();</b-button>
  </div>

</template>
<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none',
      style: {
        background: '../assets/loginbackground.svg'
      }
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    mainmenu() {
      this.$router.push('/mainmenu').catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
@import url("../assets/style.css");
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;

  background: white;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
