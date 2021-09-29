<template>
<div>
    <div class="profile-container"> <!--TODO: Implement get and patch route: -->
        <!--<p>Name: {{ user.fullName }}</p>
        <p>DOB: {{ user.dob }}</p>
        <p>Bio: {{ user.bio }}</p>
        <p>Location: {{ user.Location }}</p>-->
        <div class="profile-header">
          <div class="profile-picture">
            <b-img class="picture" :src="require('../assets/profile.png')"></b-img>
          </div>
          <div class="profile-name-location">
            <h3 class="name">Name: Firstname Lastname</h3>
            <p class="Location">Location: Gothenburg</p>
          </div>
        </div>
        <div class="profile-info">
        <p class="DOB">DOB: 1/1-xxxx</p>
        <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel mollis leo. Vestibulum posuere eget urna at aliquam. Proin at semper dui, id tincidunt mi.  </p>
        <p>Location: Gothenburg</p>
          <div class="button">
            <b-button pill class="edit-button" v-on:click="edit()">editProfile();</b-button>
          </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'profile-item',
  props: ['profile']
}
</script>

<style scoped>
@media (min-width: 726px) {
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
  height: 300px;
}
.profile-info p {
  font-size: 20px;
  padding-top: 10px;
  color: white;
}
.edit-button {
  margin-top:10px;
  background-color:#7e69ff;
  width: 30%;
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
  margin-top:50px;
  background-color:#7e69ff;
  width: 30%;
}
</style>
