<template>
<div class="container">
  <div class="form-group" id="name-input">
    <form v-on:submit.prevent="updateProfile">
      <div class="row">
        <div class="col-md-4">
          <b-avatar class="picture"></b-avatar>
          <div class="form-group">
            <label name="first-Name">First Name</label>
            <input type="text" class="form-control" v-model="firstName" id="InputFirstName">
          </div>
          <div class="form-group">
            <label name="last-Name">Last Name</label>
            <input type="text" class="form-control" v-model="lastName" id="InputLastName">
          </div>
        </div>
        <div class="col-md-8" id="about-me">
          <h3 class="BIO">About me</h3>
          <textarea v-model="bio" class="form-control" id="biotextarea"></textarea>
           <div class="form-group">
            <label name="avatar-Url">Input avatar URL</label>
            <input type="text" class="form-control" v-model="avatarUrl" id="avatarUrl">
          </div>
        </div>
      </div>
        <div class="form-group">
          <button class="btn btn-primary" id="update-button">Update</button>
        </div>
    </form>
  </div>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'edit-profile-item',
  props: {
    userID: Number,
    matchID: String
  },
  data() {
    return {
      text: '',
      firstName: '',
      lastName: '',
      bio: '',
      avatarUrl: ''
    }
  },
  methods: {
    updateProfile() {
      const r = confirm('Do you want to save these changes?')
      if (r === true) {
        Api.patch('/users/' + this.userID + '/profile', { firstName: this.firstName, lastName: this.lastName, bio: this.bio, avatarUrl: this.avatarUrl })
          .then(response => {
            console.log(response)
            window.location.href = '/profile'
          })
          .catch(error => {
            this.users = []
            alert('Your request could not be processed. Please try again.')
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 768px) {
p {
  font-size: 50px;
  padding-top: 0px;
  color: white;
}
#about-me {
  padding-top: 100px;
}

#biotextarea {
    height: 63%;
    background-color: rgba(114,204,255,0.3);
    border-color: rgba(114,204,255,0.3);
    color: white;
}
#avatarUrl {
    background-color: rgba(114,204,255,0.3);
    border-color: rgba(114,204,255,0.3);
    color: white;
}
.picture {
    margin-top: 20px;
    height: 250px;
    width: 250px;
}
}
@media screen and (max-width: 768px) {
#biotextarea {
    height: 30%;
    background-color: rgba(114,204,255,0.3);
    border-color: rgba(114,204,255,0.3);
    color: white;
}
#avatarUrl {
  margin-top: 5px;
    background-color: rgba(114,204,255,0.3);
    border-color: rgba(114,204,255,0.3);
    color: white;
}
.picture {
    margin-top: 20px;
    height: 150px;
    width: 150px;
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
#update-button {
    margin-top: 10px;
    background: #7e69ff;
    border-color: #7e69ff;
    margin-bottom: 10px;
}
.container {
    background-color: rgba(114,204,255,0.23);
    margin-top: 100px;
}
.user-container {
  padding-top: 80px;
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
  margin-top: 0px;
}
.edit-button {
  background-color:#7e69ff;
}
</style>
