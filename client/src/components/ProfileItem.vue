<template>
<div>
    <div class="user-container">
        <div class="profile-header">
          <div class="profile-picture">
            <b-img v-if="users.avatarUrl != null" v-bind:src="users.avatarUrl" class="picture"></b-img>
          </div>
          <div class="profile-name-location">
            <h1 class="name">Name: {{ users.firstName }} {{ users.lastName }}</h1>
            <h2 class="Location">Location : {{ users.location }}</h2>
          </div>
        </div>
        <div class="profile-info">
        <p class="DOB">DOB: {{ users.dob }}</p>
         <p class="DOB">Bio: {{ users.bio }}</p>
        </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'profile-item',
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/users/420/profile')
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
      text: ''
    }
  }
}
</script>

<style scoped>
@media (min-width: 768px) {
* {
  padding:0;
  margin: 0;
  box-sizing: border-box;
}
.user-container {
  padding-top: 80px;
}
.profile-picture {
  float: left;
  padding: 20px;
  height: 20px;
}
.picture {
    height: 250px;
}
.profile-info {
  font-size: 20px;
  float: left;
  flex-direction: column;
  justify-content: center;
}
.profile-header {
  background: rgba(114,204,255,0.23);
  width: 90%;
  height: 280px;
  position: relative;
  box-shadow: 0px 5px 4px rgba(0,0,0,0.2);
  margin-top: 30px;
  display: flex;
  left: 5%;
}
.profile-name-location {
  float: left;
  flex-direction: column;
  justify-content: center;
  padding-top: 90px;
  padding-left: 240px;
}
.profile-name-location h1 {
  font-weight: bold;
  color: white;
}
.profile-name-location h2 {
  font-weight: bold;
  display: flex;
  color: #EABCA3;
}
.profile-info {
  background: rgba(114,204,255,0.23);
  width: 90%;
  position: absolute;
  box-shadow: 0px 5px 4px rgba(0,0,0,0.2);
  margin-top: 10px;
  left: 5%;
  padding-bottom: 10px;
  height: auto;
}
.profile-info p {
  font-size: 20px;
  padding-top: 10px;
  color: white;
}
.edit-button {
  background-color:#7e69ff;
}
}
* {
  padding:0;
  margin: 0;
  box-sizing: border-box;
}
.profile-picture {
  padding: 20px;
}
.profile-info {
  font-size: 20px;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 30px;
}
.profile-header {
  background: rgba(114,204,255,0.23);
  box-shadow: 0px 5px 4px rgba(0,0,0,0.2);
}
.profile-name-location h3 {
  font-weight: bold;
  color: white;
}
.profile-name-location p {
  font-weight: bold;
  color: #EABCA3;
}
.profile-info {
  background: rgba(114,204,255,0.23);
  box-shadow: 0px 5px 4px rgba(0,0,0,0.2);
}
.profile-info p {
  font-size: 20px;
  color: white;
  margin-top: 30px;
}
.edit-button {
  background-color:#7e69ff;
}
</style>
