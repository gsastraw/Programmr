<template>
  <div class="body">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <b-img class="square-logo" :src="require('../assets/squarelogo.svg')"></b-img>
      <b-button class="btn-message" variant="primary" v-on:click="login()">"Login to Google!"</b-button>
      <p>Message from the server: {{ message }}</p>
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
    login() {
      const route = async () => {
        return await Api.get('/auth/google')
      }
      console.log(route)
      return route()
    }
  }
}
</script>

<style>
@import url("../assets/style.css");
</style>
