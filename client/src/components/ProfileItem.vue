<template>
<div>
    <div class="user-container">
        <div class="profile-header">
          <div class="profile-picture">
            <b-img class="picture" :src="require('../assets/profile.png')"></b-img>
          </div>
          <div class="profile-name-location">
            <h3 class="name">Name: {{ users.firstName }} {{ users.lastName }}</h3>
            <p class="Location">Location : {{ users.location }}</p>
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
    Api.get('/users/3/profile')
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
.profile-picture {
  float: left;
  padding: 20px;
}
.picture {
    width: 60%;
    height: auto;
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
  height: 170px;
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
  padding-top: 60px;
}
.profile-name-location h3 {
  font-weight: bold;
  color: white;
}
.profile-name-location p {
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
  height: 250px;
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
  height: auto;
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
  margin-top: 5px;
  padding-bottom: 10px;
}
.profile-info p {
  font-size: 20px;
  padding-top: 10px;
  color: white;
  margin-top: 10px;
}
.edit-button {
  background-color:#7e69ff;
}
</style>
