<template>
<div>
<div class="container">
  <div class="row">
    <div class="col-md-4">
      <b-avatar v-if="users.avatarUrl != null" v-bind:src="users.avatarUrl" class="picture"></b-avatar>
      <h1 class="name">{{ users.firstName }} {{ users.lastName }}</h1>
      <p class="DOB"> {{ users.dob }}</p>
      <p class="Location"> {{ users.location }}</p>
    </div>
    <div class="col-md-8" id="about-me">
      <h3 class="BIO">About me</h3>
      <p class="BIO">{{ users.bio }}</p>
    </div>
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
    Api.get('/users/1/profile')
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
  color: #7E69FF;
}
p {
  font-size: 20px;
  padding-top: 10px;
  color: white;
}
#about-me {
  padding-top: 100px;
}
.edit-button {
  background-color:#7e69ff;
}
</style>
