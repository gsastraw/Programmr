<template>
    <div>
    <Sidebar/>
    <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <h1>List of matches:</h1>
    <b-container fluid="md" class="myContainer">
      <b-row>
    <b-col v-for="match in matches" v-bind:key="match.googleId" cols="12" sm="6" md="4">
    <match-item v-bind:match="match"/>
    </b-col>
        </b-row>
    </b-container>
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
    Api.get('/matches')
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
  }
}

</script>
