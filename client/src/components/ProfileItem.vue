<template>
<div>
    <div class="profile-container"> <!--TODO: Implement get and patch route: -->
        <!--<p>Name: {{ user.fullName }}</p>
        <p>DOB: {{ user.dob }}</p>
        <p>Bio: {{ user.bio }}</p>
        <p>Location: {{ user.Location }}</p>-->
        <div class="avatar-container">
          <p>Hey an avatar!</p>
        </div>
        <p class="name">Name: Firstname Lastname</p>
        <p>DOB: 1/1-xxxx</p>
        <p>Bio: Really cool biography</p>
        <p>Location: Gothenburg</p>
    </div>
    <b-button pill class="edit-button" v-on:click="edit()">editProfile();</b-button>
</div>
</template>

<script>
export default {
  name: 'profile-item',
  props: ['profile']
}
</script>

<style scoped>
.profile-container{
  background-color: #425A7F;
  padding: 30px;
  padding-bottom: 30%px;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 1px;
  margin-top: 1%;
}
p {
    color: white;
    text-align: center;
    font-size: 18px;
}
.avatar-container {
  background-color: #556A8C;
  text-align: center;
  padding-bottom: 20%;
  margin-left: 30%;
  margin-right: 30%;
}
.edit-button {
  background-color: #7E69FF;
  padding-left: 40px;
  padding-right: 40px;
}
</style>
