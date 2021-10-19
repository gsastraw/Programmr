<template>
<div>
  <div v-if="isVisible">
  <Vue2InteractDraggable
  :interact-out-of-sight-x-coordinate="200"
  :interact-max-rotation="15"
  :interact-lock-swipe-down="true"
  :interact-lock-swipe-up="true"
  :interact-x-threshold="100"
  :interact-y-threshold="100"
  @draggedLeft="swipeLeft"
  @draggedRight="swipeRight">
  <div class="card-container">
    <b-container class="img-container">
      <b-img v-bind:src="this.recommendedUsers[index].profile.avatarUrl.toString()" class="profile-container"></b-img>
    </b-container>
    <b-container class="text-container">
      <b-col class="name-text">
        {{ this.recommendedUsers[index].profile.firstName }}
        {{ this.recommendedUsers[index].profile.lastName }}
      </b-col>
      <div class="bio-text">{{ this.recommendedUsers[index].profile.bio}}</div>
    </b-container>
    </div>
  </Vue2InteractDraggable>
  </div>
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
  props: {
    userId: Number
  },
  data() {
    // TODO: Add REST route to push all potential users from location
    return {
      isVisible: false,
      index: 0,
      currentUser: [],
      allUsers: [],
      recommendedUsers: []
    }
  },
  created() {
    const pleaseWait = []
    pleaseWait.push(UserService.getAllUsers().then(response => {
      this.allUsers = response.data
    }))
    pleaseWait.push(UserService.getUserById(this.userId).then(response => {
      this.currentUser = response.data
    }).catch(error => {
      alert(error)
    }))
    Promise.all(pleaseWait).then(response => {
      UserService.getRecommendedUsers(this.userId).then(response => {
        this.recommendedUsers = response.data
        console.log(this.currentUser)
        const newArr = this.recommendedUsers.filter(user => user.id !== this.userId.toString() && !this.currentUser.matchInfo.accepted.includes(this.allUsers.find(u => u.googleId === user.id)._id) && !this.currentUser.matchInfo.rejected.includes(this.allUsers.find(u => u.googleId === user.id)._id))
        this.recommendedUsers = newArr
        if (this.recommendedUsers.length > 0) {
          this.isVisible = true
        }
        console.table(newArr)
      }).catch(error => {
        alert(error)
      })
    }).catch(error => {
      console.log(error)
    })
    // currently just gets the user's recommended users at position 2 in the array
  },
  methods: {
    swipeRight() {
      UserService.postSwipeStatus(this.userId, this.recommendedUsers[this.index].id, 'accept').then(response => {
        console.log(response)
      }).catch(error => {
        alert(error)
      })
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.isVisible = false, 500)
      setTimeout(() => {
        this.index++
        if (this.recommendedUsers.length <= this.index) {
          this.isVisible = false
        } else {
          this.isVisible = true
        }
      }, 500)
    },
    swipeLeft() {
      UserService.postSwipeStatus(this.userId, this.recommendedUsers[this.index].id, 'reject').then(response => {
        console.log(response)
      }).catch(error => {
        alert(error)
      })
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.isVisible = false, 500)
      setTimeout(() => {
        this.index++
        if (this.recommendedUsers.length <= this.index) {
          this.isVisible = false
        } else {
          this.isVisible = true
        }
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
  font-size: 1.2em;
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
  padding: 0px;
  background-color: rgba(114, 204, 255, 0.23);
  touch-action: manipulation;
}

.profile-container {
  width: 100%;
  background: none;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .card-container {
  align-items: center;
  display: flex;
  position: relative;
  max-width: 100%;
  width: 75vw;
  height: 35vh;
  /* border-radius: 10px; */
  background-color: rgba(114, 204, 255, 0.23);
}

.card-container .text-container {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}

.profile-container {
  width: 100%;
  background: none;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
}

.bio-text {
  /* display: none; */
  font-size: 2.2vw;
}

.name-text {
  font-weight: bold;
  font-size: 2.8vw;
}

@media screen and (max-width: 450px) {
  .card-container {
  align-items: center;
  display: flex;
  position: relative;
  width: 280px;
  height: 30vh;
  /* border-radius: 10px; */
  background-color: rgba(114, 204, 255, 0.23);
}
  .card-container .text-container {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  .profile-container {
    width: 100%;
    background: none;
    height: 100%;
    object-fit: cover;
  }

  .bio-text {
    /* display: none; */
    font-size: 2.6vw;
  }

  .name-text {
    font-weight: bold;
    font-size: 1.1em;
  }
}
}
</style>
