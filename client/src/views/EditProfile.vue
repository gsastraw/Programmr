<template>
  <div class="background">
    <b-img class="logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <Sidebar />
    <edit-profile-item :userId=Number($route.params.id) />
    <b-button :to="{ name: 'profile', params: { userId: this.$route.params.userId }}" class="button" squared>Back</b-button>
    <b-button class="button" id="delete-user" squared v-on:click="deleteUser()">Delete account</b-button>
    <b-button v-b-modal.modal-prevent-closing class="button">Reset profile</b-button>
    <b-modal id="modal-prevent-closing" ref="modal" title="Create an account" hide-footer>
      <form v-on:submit.prevent="createProfile">
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
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import EditProfileItem from '../components/EditProfileItem.vue'
import { Api } from '@/Api'

export default {
  name: 'EditProfile',
  props: {
  },
  components: {
    'edit-profile-item': EditProfileItem,
    Sidebar
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
  methods: {
    deleteUser() {
      const r = confirm('Are you sure you want to delete your account? This is irreversible.')
      if (r === true) {
        Api.delete('/users/' + this.$route.params.userId)
          .then(response => {
            console.log('User deleted')
          }).catch(error => {
            alert(error)
          })
        window.location.href = '/'
      }
    },
    createProfile() {
      const r = confirm('Are you sure you want to create a new profile? This is irreversible and will overwrite your current profile.')
      if (r === true) {
        Api.put('/users/' + this.$route.params.userId + '/profile', { firstName: this.firstName, lastName: this.lastName, dob: this.dob })
          .then(response => {
            console.log(response)
            alert('Profile has been created, sign in again to see your profile')
            window.location.href = '/'
          })
          .catch(error => {
            alert('Profile could not be created')
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
#delete-user {
  background-color: red;
}
.button {
    margin-top: 5px;
    background: #7e69ff;
}
h1 {
    color: white;
    font-weight: bold;
}
.logo {
  position: fixed;
  left: 1%;
  width: 100px;
  top: 1%;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: scroll;

  background: url("../assets/loginbackground.svg") no-repeat center center fixed;;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
@media screen and (min-width: 768px) {
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;

  background: url("../assets/loginbackground.svg") no-repeat center center fixed;;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
}
</style>
