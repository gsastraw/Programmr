<template>
  <div class="card-container">
      <div class="profile-container"></div>
  </div>
</template>

<script>
import Api from '../Api'

export default {
  name: 'cardview',
  components: {
  },
  props: {
    firstName: String,
    dob: String,
    location: {
      long: Number,
      lat: Number
    },
    bio: String,
    avatarUrl: String
  },
  mounted() {
  },
  methods: {
    getUsersBasedOffLocation(id) {
      Api.get('users').then(
        response => {

        }
      )
    }
  }
}

</script>

<style>
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
    position: absolute;
    width: 329px;
    height: 240px;
    left: 10px;
    top: 15px;
    background: rgba(255,255,255,0.1);
  }
}
</style>
