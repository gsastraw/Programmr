<template>

  <div class="background">
  <div class="body">
    <div class="left-side">
        <h1 class="tagline-text">A dating app for programmers. By programmers.</h1>
        <h2 class="description-text">Programmr is a dating app that matches you with other potential programmers.</h2>
      <div class="login-button-container">
        <b-button to="/mainmenu" class="login-button" variant="dark">Login</b-button>
      </div>
    </div>

  <div class="right-side">
    <b-img class="kissing-people" :src="require('../assets/fetchimage.png')"></b-img>
  </div>

  <div class="footer">
    <b-navbar fixed="bottom" variant="dark" class="navbar">
      <b-img class="white-logo" :src="require('../assets/whitelogo.svg')"></b-img>
    </b-navbar>
  </div>
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
.footer {
  display: flex;
  align-content: flex-start;
}
.left-side {
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 100%;
  min-width: 40%;
  margin-top: 10%;
  justify-content: flex-start;
  padding: 20px 70px;
}
.right-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  height: 100%;
  margin-right: 5%;
  min-width: 60%;
}
.kissing-people {
  max-width: 100%;
}
.body {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}
.white-logo {
  max-width: 100%;
  max-height: 100%;
  /* width: 20%;
  margin-left: 25%; */
}
.login-button-container {
  display: flex;
  justify-content: center;
}
.login-button {
  background-color: rgb(51, 50, 50);
  width: 10vw;
  height: auto;
  margin-top: 50px;
}
/* .programmr-text {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.35em;
  letter-spacing: 2px;
  color: white;
  font-weight: 600;
  margin-block: 10%;
} */
.description-text {
  font-size: 8px;
  font-family: 'Source Code Pro', monospace;
  color: white;
  margin-top: 20px;
  text-shadow: 1.5px 1px black;
}
.sign-in-text {
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: black;
  font-size: 1.25em;
  font-weight: 250;
}
.tagline-text {
  font-family: 'Archivo', sans-serif;
  font-size: 25px;
  letter-spacing: 2px;
  color: white;
  text-shadow: 5px 2px black;
  /* margin-block: 8%; */
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

@media (max-width: 768px) {
  .right-side {
    display: none;
    /* background-image: url('../assets/contemplativeman.jpg'); */
  }
  .left-side {
    display: flex;
    align-content: center;
    padding: 12px;
  }
  .login-button {
  background-color: rgb(51, 50, 50);
  width: 20vw;
  height: auto;
  margin-top: 50px;
  }
}
</style>
