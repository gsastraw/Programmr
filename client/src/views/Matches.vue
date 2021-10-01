<template>
    <div>
    <Sidebar/>
    <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <b-container fluid="md" class="myContainer">
      <b-card-group deck>
        <b-card no-body header="List of matches:">
      <b-list-group>
        <b-list-group-item button v-for="match in matches" v-bind:key="match.googleId">
          <match-item v-bind:match="match" v-on:del-match="deleteMatch"/>
        </b-list-group-item>
      </b-list-group>
      </b-card>
      </b-card-group>
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
    }
  }
}

</script>
