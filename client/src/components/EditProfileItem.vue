<template>
<div>
<div class="container">
  <div class="row">
    <div class="col-md-4">
      <b-avatar v-if="users.avatarUrl != null" v-bind:src="users.avatarUrl" class="picture"></b-avatar>
      <div class="form-group" id="name-input">
          <label for="InputFirstName">First Name:</label>
          <input v-bind:users="firstName" type="Name" class="form-control" id="InputFirstName">
            <label for="InputLastName">Last Name:</label>
          <input v-bind:users="lastName" type="Name" class="form-control" id="InputLastName">
      </div>
      <p class="DOB"> {{ users.dob }}</p>
      <p class="Location"> {{ users.location }}</p>
    </div>
    <div class="col-md-8" id="about-me">
      <h3 class="BIO">About me</h3>
      <textarea v-bind:users="bio" class="form-control" id="biographyTextarea1"></textarea>
    </div>
  </div>
</div>
    <b-button class="button" v-on:click="updateProfile()" squared>Submit</b-button>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'edit-profile-item',
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/users/2/profile')
      .then(response => {
        console.log(response)
        this.users = response.data
      })
      .catch(error => {
        this.users = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  data() {
    return {
      users: [],
      text: '',
      firstName: String,
      lastName: String,
      bio: String
    }
  },
  methods: {
    updateProfile() {
      Api.patch('/users/2/profile')
        .then(response => {
          this.users = response.data.users
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
p {
  font-size: 50px;
  padding-top: 0px;
  color: white;
}
#about-me {
  margin-top: 0px;
}
}
#name-input {
    margin-top: 0px;
    color: white;
}
#InputFirstName {
    background-color: rgba(114,204,255,0.3);
    color: white;
    border-color: rgba(114,204,255,0.3);
    margin-bottom: 20px;
}
#InputLastName {
    background-color: rgba(114,204,255,0.3);
    border-color: rgba(114,204,255,0.3);
    color: white;
}
#biographyTextarea1 {
    height: 65%;
    background-color: rgba(114,204,255,0.3);
    border-color: rgba(114,204,255,0.3);
    color: white;
}
.button {
    margin-top: 5px;
    background: #7e69ff;
}
  .container {
    background-color: rgba(114,204,255,0.23);
    margin-top: 100px;
  }
.user-container {
  padding-top: 80px;
}
.picture {
    margin-top: 20px;
    height: 250px;
    width: 250px;
}
h1 {
  color: #72CCFF;
  font-weight: bold;
  margin-top: 10px;
}
h3 {
  color: #72CCFF;
}
p {
  font-size: 20px;
  padding-top: 10px;
  color: white;
}
#about-me {
  padding-top: 10%;
}
.edit-button {
  background-color:#7e69ff;
}
</style>
