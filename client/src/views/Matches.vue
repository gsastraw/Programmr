<template>
<div>
    <div class="background">
    <b-img class="logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <Sidebar/>
    <b-container fluid="md" class="myContainer">
      <b-card-group deck>
        <b-card class="header" no-body header="List of matches:">
      <b-list-group class="list-group-mine">
        <b-list-group-item button v-for="match in matches" v-bind:key="match.googleId">
          <match-item v-bind:match="match" v-on:del-match="deleteMatch"/>
        </b-list-group-item>
      </b-list-group>
      </b-card>
      </b-card-group>
    </b-container>
      <b-button class="delete-matches" v-on:click="deleteMatches()">DeleteAll( );</b-button>
    </div>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import MatchItem from '../components/MatchItem.vue'
import { Api } from '@/Api'

export default {
  name: 'matches',
  components: {
    'match-item': MatchItem,
    Sidebar
  },

  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/users/1/matches')
      .then(response => {
        console.log(response)
        this.matches = response.data
      })
      .catch(error => {
        this.matches = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  data() {
    return {
      matches: [],
      text: ''
    }
  },
  methods: {
    deleteMatch(id) {
      console.log(`Delete match with id ${id}`)
      Api.delete(`/matches/${id}`)
        .then(response => {
          const index = this.matches.findIndex(match => match._id === id)
          this.matches.splice(index, 1)
        })
        // TODO: catch error
    },
    deleteMatches() {
      const r = confirm('This will delete all matches in the system, continue?')
      if (r === true) {
        Api.delete('/matches')
          .then(response => {
            this.matches = response.data.matches
          })
          .catch(error => {
            this.message = error
          })
      }
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
  overflow: scroll;

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
.list-group-mine .list-group-item{
  background-color: #262942;
}
.list-group-mine .list-group-item:hover{
  background-color: #425A7F;
}
.header {
    background-color: #262942;
    color: white;
    font-size: 18px;
}
.delete-matches {
  margin-top: 15px;
}
.delete-matches:hover {
  background-color: red;
  margin-bottom: 50px;
}
@media screen and (max-width: 768px) {
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
  .myContainer {
    padding-top: 100px;
  }
}
</style>
