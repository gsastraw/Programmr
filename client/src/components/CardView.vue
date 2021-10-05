<template>
<div>
  <div v-if="isVisible">
  <Vue2InteractDraggable
  :interact-out-of-sight-x-coordinate="400"
  :interact-max-rotation="15"
  :interact-x-threshold="200"
  :interact-y-threshold="200"
  @draggedLeft="lastUser"
  @draggedRight="nextUser">
  <div class="card-container">
    <b-container class="img-container">
      <b-img v-if="users[index].profile.avatarUrl != null" v-bind:src="users[index].profile.avatarUrl" class="profile-container"></b-img>
      <b-img class="profile-container" v-else v-bind:src="'https://indol.se/wp-content/uploads/2017/04/profile-placeholder.png'"></b-img>
    </b-container>
    <b-container class="text-container">
      <b-col class="name-text">
        {{ users[index].profile.firstName }}
        {{ users[index].profile.lastName }}
      </b-col>
      <div class="bio-text">{{ users[index].profile.bio }}</div>
    </b-container>
    </div>
  </Vue2InteractDraggable>
  </div>
  <b-button class="button" variant="danger" v-on:click="lastUser">swipeLeft();</b-button>
  <b-button class="button" variant="success" v-on:click="nextUser">swipeRight();</b-button>
</div>
</template>

<script>
import UserService from '../services/UserService'
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  name: 'cardview',
  components: {
    Vue2InteractDraggable
  },
  data() {
    // TODO: Add REST route to push all potential users from location
    return {
      isVisible: true,
      index: 0,
      users: []
    }
  },
  computed: {
    current() {
      return this.users[this.index]
    },
    next() {
      return this.users[this.index + 1]
    }
  },
  mounted() {
    UserService.getAllUsers().then(response => {
      this.users = response.data
    })
  },
  methods: {
    nextUser() {
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.isVisible = false, 500)
      setTimeout(() => {
        this.index++
        if (this.users[this.index] == null) {
          this.index = 0
        }
        this.isVisible = true
      }, 500)
    },
    lastUser() {
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.isVisible = false, 500)
      setTimeout(() => {
        this.counter--
        if (this.users[this.index] == null) {
          this.counter = 0
        }
        this.isVisible = true
      }, 500)
    }
  }
}

</script>

<style>
.card-container .img-container {
  padding-left: 0;
  padding-right: 20px;
  height: 100%;
  width: 60%;
}
.card-container .text-container {
  width: 600px;
  padding-left: 0;
  padding-right: 0;
}
.name-text {
  font-weight: bold;
  font-size: 2em;
  line-height: 3em;
  color: white;
}
.bio-text {
  font-size: 1.4em;
  color: white;
}
.button {
  width: 200px;
  height: vh;
}
.card-container {
  align-items: center;
  display: flex;
  position: relative;
  height: 400px;
  border-radius: 10px;
  padding: 20px;
  background-color: rgba(114, 204, 255, 0.23);
}

.profile-container {
  width: 100%;
  background: none;
  height: 100%;
  object-fit: cover;
}

@media screen and (min-width: 768px) {
  .card-container {
    background-color: rgba(114, 204, 255, 0.23);
  }
    .profile-container {
    background: none;
  }
}

@media screen and (max-width: 768px) {
  .card-container {
    background-color: rgba(114, 204, 255, 0.23);
  }

  .profile-container {
    width: 240px;
    height: 280px;
    background: none;
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
