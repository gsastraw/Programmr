<template>
    <div>
    <Sidebar/>
    <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <h1>List of matches:</h1>
    <div v-for="match in matches" v-bind:key="match">
      <p>The match {{ match }}</p>
    </div>
    <!--<h1>Profile for user id: {{ $route.params.id }}</h1>-->
    <!--<b-container fluid="md" class="myContainer">
      <b-row>
        <b-col v-for="match in matches" v-bind:key="match._id" cols="12" sm="6" md="4">
            <match-item v-bind:match="match" v-on:del-match="deleteMatch"/>
        </b-col>
      </b-row>
    </b-container>-->
    </div>
</template>

<script>
export default {
  name: 'matches',
  data() {
    return {
      matches: [
        'match1',
        'match2',
        'match3'
      ]
    }
  }
}

</script>
