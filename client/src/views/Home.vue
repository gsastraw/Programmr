<template>

  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
      <div class="welcome-to-programmr container">{ Welcome to Programmr! }</div>
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
      message: 'none'
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

<style>
@import url("../assets/style.css");
</style>
