<template>
<div>
  <div class="card-container">
    <b-container>
      <b-row></b-row>
      <b-col class="name-text">
        {{ users[counter].profile.firstName }}
        {{ users[counter].profile.lastName }}
      </b-col>
    </b-container>
      <b-img v-if="users[counter].profile.avatarUrl != null" v-bind:src="users[counter].profile.avatarUrl" class="profile-container">
        </b-img>
        <b-img class="profile-container" align="left" v-else v-bind:src="'https://indol.se/wp-content/uploads/2017/04/profile-placeholder.png'"></b-img>
        <div class="bio-text">{{ users[counter].profile.bio }}</div>
        </div>
  <b-button class="button" variant="danger" v-on:click="lastUser">swipeLeft();</b-button>
  <b-button class="button" variant="success" v-on:click="nextUser">swipeRight();</b-button>
</div>
</template>

<script>
import UserService from '../services/UserService'
export default {
  name: 'cardview',
  components: {
  },
  data() {
    return {
      counter: 0,
      users: []
    }
  },
  created() {
  },
  mounted() {
    UserService.getAllUsers().then(response => {
      this.users = response.data
    })
  },
  methods: {
    nextUser() {
      // currently it just iterates through every user
      this.counter++
      if (this.users[this.counter] == null) {
        this.counter = 0
      }
    },
    lastUser() {
      this.counter--
      if (this.users[this.counter] == null) {
        this.counter = 0
      }
    }
  }
}

</script>

<style>
.name-text {
  right: -183px;
  font-weight: bold;
  font-size: 2em;
  line-height: 3em;
  color: white;
}
.bio-text {
  float: right;
  font-size: 1.4em;
  color: white;
}
.button {
  width: 200px;
  height: vh;
}
.card-container {
  position: relative;
  width: 1416px;
  height: 650px;
  background-color: rgba(114, 204, 255, 0.23);
}

.profile-container {
  margin-right: 10px;
  position: absolute;
  width: 350px;
  height: 350px;
  left: 40px;
  top: 63px;
  background: rgba(255,255,255,0.1);
}

@media screen and (min-width: 768px) {
    .card-container {
    width: 850px;
    height: 400px;
    background-color: rgba(114, 204, 255, 0.23);
  }
    .profile-container {
    position: absolute;
    width: 300px;
    height: 350px;
    left: 20px;
    top: 22px;
    background: rgba(255,255,255,0.1);
  }
}

@media screen and (max-width: 768px) {
  .card-container {
    width: 357px;
    height: 527px;
    background-color: rgba(114, 204, 255, 0.23);
  }

  .profile-container {
    top: 30px;
    left: 55px;
    width: 240px;
    height: 280px;
    background: rgba(255,255,255,0.1);
  }

  .bio-text {
    top: 52vh;
    left: 0.5%;
    font-weight: bolder;
  }

  .name-text {
    top: 45vh;
    right: -1.3vw;
  }
}
</style>
