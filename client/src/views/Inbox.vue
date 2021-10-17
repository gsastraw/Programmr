<template>
<div class="background">
    <b-img class="logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <Sidebar/>
    <InboxView :matchId=this.$route.params.userId>
    </InboxView>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import InboxView from '../components/InboxView.vue'

export default {
  name: 'inbox',
  components: {
    Sidebar,
    InboxView
  },
  data() {
    return {
    }
  },
  methods: {
    retrieveMatchId() {
      return this.$route.params
    }
  }

}
</script>

<style scoped>
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
.logo {
  position: fixed;
  left: 1%;
  width: 100px;
  top: 1%;
}
</style>
