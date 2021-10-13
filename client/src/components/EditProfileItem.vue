<template>
<div class="container">
  <div class="form-group" id="name-input">
    <form v-on:submit.prevent="updateProfile">
      <div class="row">
        <div class="col-md-4">
          <b-avatar v-bind:src=avatarUrl class="picture"></b-avatar>
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
  data() {
    return {
      text: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    updateProfile() {
      const r = confirm('Do you want to save these changes?')
      if (r === true) {
        Api.patch('/users/1/profile', { firstName: this.firstName, lastName: this.lastName, bio: this.bio })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            this.users = []
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
    height: 85%;
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
#biotextarea {
    height: 65%;
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
  margin-top: 0px;
}
.edit-button {
  background-color:#7e69ff;
}
</style>
