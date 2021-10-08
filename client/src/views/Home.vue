<template>

  <div class="background">
  <div>
  <b-container>
    <b-row align-h="start">
      <b-col sm="4" offset-sm="1" class="tagline-text">A dating app for programmers. By programmers.</b-col>
    </b-row>
    <b-row align-h="start">
      <b-col sm="4" offset-sm="1" class="description-text">Programmr is a dating app that matches you with other potential programmers.</b-col>
    </b-row>
    </b-container>

  <b-container>
    <b-row align-h="end">
      <b-img class="kissing-people" :src="require('../assets/fetchimage.png')"></b-img>
    </b-row>
  </b-container>

  <b-container>
    <b-row align-h="start">
      <b-button to="/mainmenu" class="button" variant="dark" squared>Login</b-button>
    </b-row>
  </b-container>

  <b-navbar fixed="bottom" variant="dark" class="navbar">
    <b-container>
      <b-row align-h="start">
        <b-img class="white-logo" :src="require('../assets/whitelogo.svg')"></b-img>
      </b-row>
    </b-container>
  </b-navbar>

</div>
  </div>
</template>
<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
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
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@900&display=swap');
@import url("../assets/style.css");
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap');
.white-logo {
  width: 45%;
  margin-left: 25%;
}
.button {
  width: 13%;
  margin-top: 3%;
  background-color: rgb(51, 50, 50);
}

.kissing-people {
  margin-top: -35%;
  margin-right: -15%;
}
.programmr-text {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.35em;
  letter-spacing: 2px;
  color: white;
  font-weight: 600;
  margin-block: 10%;
}
.description-text {
  font-size: 1.45em;
  font-family: 'Source Code Pro', monospace;
  color: white;
  text-shadow: 1.5px 1px black;
  right: 18%;
}
.sign-in-text {
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: black;
  font-size: 1.25em;
  font-weight: 250;
}
.tagline-text {
  font-family: 'Archivo', sans-serif;
  font-size: 2em;
  letter-spacing: 2px;
  color: white;
  text-shadow: 5px 2px black;
  margin-block: 8%;
  right: 18%;
  /* display: inline-block; */
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background: #175fbd;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.navbar {
  position: fixed;
  height: 15%;
  width: 100%;
}

.description-text {
  font-size: 1.4em;
  font-family: 'Source Code Pro', monospace;
  color: white;
}
</style>
