<template>
<div>
  <div class="card-container">
    <b-container>
      <b-row></b-row>
      <b-col class="name-text">
        {{ users[counter].firstName }}
        {{ users[counter].lastName }}
      </b-col>
    </b-container>
      <b-img v-bind:src="users[counter].avatarUrl" class="profile-container">
        </b-img>
        <b-container>
          <b-row>
            <b-col class="bio-text">{{ users[counter].bio }}</b-col>
          </b-row>
        </b-container>
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
  font-size: 1.4em;
  right: -150px;
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
  }

  .name-text {
    top: 45vh;
    right: -1.3vw;
  }
}
</style>
