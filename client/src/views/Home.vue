<template>
  <div class="background">
  <div class="body">
    <div class="left-side">
        <h1 class="tagline-text">A dating app for programmers. By programmers.</h1>
        <h2 class="description-text">Programmr is a dating app that matches you with other potential programmers.</h2>
      <div class="login-button-container">
        <b-button v-b-modal.modal-scrollable class="login-button" variant="dark">Login</b-button>
        <b-modal id="modal-scrollable" scrollable title="Choose a user to log in" hide-footer>
          <b-list-group>
          <b-list-group-item button v-for="user in users" v-bind:key="user.googleId">
            <router-link :to="{ name: 'mainmenu', params: { userId: user.googleId }}">
            <p>Name: {{user.profile.firstName }} {{user.profile.lastName}} id: {{user.googleId}}</p>
            </router-link>
          </b-list-group-item>
          </b-list-group>
        </b-modal>
      </div>
      <div>

    <b-button v-b-modal.modal-prevent-closing class="login-button" variant="dark">Register</b-button>
    <b-modal id="modal-prevent-closing" ref="modal" title="Register" hide-footer>
      <form v-on:submit.prevent="createUser">
        <div class="form-group">
            <label name="first-Name">First Name</label>
            <input type="text" class="form-control" v-model="firstName" id="InputFirstName">
          </div>
          <div class="form-group">
            <label name="last-Name">Last Name</label>
            <input type="text" class="form-control" v-model="lastName" id="InputLastName">
          </div>
          <div class="form-group">
            <label name="dob">Birthday </label>
            <b-calendar v-model="dob" locale="en-US" id="InputDob"></b-calendar>
          </div>
          <div class="form-group">
          <button class="btn btn-primary" id="create-button">Ok</button>
        </div>
      </form>
    </b-modal>
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
// ROUTE MATHCING DONE HERE
// @ is an alias to /src
import { Api } from '@/Api'
import UserService from '../services/UserService'
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      dob: '',
      users: [],
      context: null
    }
  },
  created() {
    UserService.getAllUsers().then(response => {
      this.users = response.data
    }).catch(error => {
      alert('No users found')
      console.log(error)
    })
  },
  methods: {
    mainmenu() {
      this.$router.push('/mainmenu').catch(error => {
        console.log(error)
      })
    },
    createUser() {
      const userID = Math.floor(Math.random() * 1000) + 1
      Api.post('/users', { id: userID.toString() })
        .then(response => {
          console.log(response)
          Api.post('/users/' + userID.toString() + '/profile', { firstName: this.firstName, lastName: this.lastName, dob: this.dob })
            .then(response => {
              console.log(response)
              window.location.href = '/'
            })
            .catch(error => {
              alert('Profile could not be created')
              console.log(error)
            })
        })
        .catch(error => {
          alert('Your request could not be processed. Please try again.')
          console.log(error)
        })
    },
    handleLogin() {
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@900&display=swap');
@import url("../assets/style.css");
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300&display=swap');
.list-group-item:hover{
  background-color: #a2b1c9;
  font-style: normal;
}
p {
  color: black;
}
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
  margin-top: 10px;
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
