<template>
<div class="chat-box-container">
  <div class="chat-box">
    <div class="chat-box-bar-container">
    <div class="chat-box-bar">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MatchService from '../services/MatchService'

export default {
  name: 'inbox-view',
  components: {

  },
  props: {
    matchId: String,
    userId: String
  },
  mounted() {
    MatchService.getMatch(this.matchId).then(response => {

    })
  },
  data() {
    return {
      matchData: []
    }
  }
}
</script>

<style>
.chat-box-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 80%;
  min-width: 80%;
  justify-content: flex-start;
  margin-top: 20%;
}
.chat-box {
  width: 100%;
  max-width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.26);
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.chat-box-bar-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 80%;
  min-width: 80%;
  justify-content: flex-start;
  margin-top: 20%;
}
.chat-box-bar {
  width: 100%;
  height: 15%;
  background: rgba(0, 0, 0, 0.41);
}
.text-box-container {

}
.text-box {

}
</style>
