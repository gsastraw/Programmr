<template>
<div class="view chat">
<header>
  <b-button to="/matches/" class="button" >Back</b-button>
  <h1>{{ this.matchedUser.profile.firstName + ' ' + this.matchedUser.profile.lastName }}</h1>
</header>
<section class="chat-box">
  <div v-for="message in messages" :key="message.content">
  <div class="message" v-if="message.sender == matchedUser._id">
  {{ message.content }}  <span class="timestamp">{{ new Date(message.createdAt).toLocaleString('se') }}</span>
  </div>
  <div class="message match-message" v-else>{{ message.content }} <span class="timestamp">{{ new Date(message.createdAt).toLocaleString('se') }}</span></div>
  </div>
</section>
<footer>
  <form @submit.prevent="sendMessage">
    <input type="text" placeholder="Write a message..." v-model="message"/>
    <input type="submit" value="Send"/>
  </form>
</footer>
</div>
</template>

<script>
import MatchService from '../services/MatchService'
import UserService from '../services/UserService'
import { Api } from '@/Api'

export default {
  name: 'inbox-view',
  components: {

  },
  props: {
    matchId: String,
    userId: Number
  },
  mounted() {
    const pleaseWait = []
    pleaseWait.push(MatchService.getMatch(this.matchId).then(response => {
      console.log(response)
      this.matchData = response.data
    }))
    pleaseWait.push(UserService.getUserById(this.userId).then(response => {
      this.userData = response.data
    }))
    pleaseWait.push(MatchService.getMessage(this.matchId).then(response => {
      this.messages = response.data
    }))
    pleaseWait.push(UserService.getAllUsers().then(response => {
      this.allUsers = response.data
    }))
    Promise.all(pleaseWait).then(() => {
      const getMatchedUserObjectId = this.matchData.profiles.find(id => id !== this.userData._id)
      const matchedUserObject = this.allUsers.find(user => user._id === getMatchedUserObjectId)
      this.matchedUser = matchedUserObject
    })
  },
  data() {
    return {
      matchData: [],
      messages: [],
      userData: [],
      allUsers: [],
      matchedUser: [],
      message: ''
    }
  },
  methods: {
    sendMessage() {
      Api.post('/matches/' + this.matchId + '/conversation', {
        sender: this.userId.toString(),
        content: this.message
      })
      console.log(this.userId)
      console.log(this.message)
      window.location.reload()
      const elmnt = document.getElementById('top')
      elmnt.scrollIntoView(false)
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 768px) { /**************************** LARGER SCREENS */
h1 {
float: left;
margin-left: 50px;
}
* {/* Entire page */
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
margin: 0;
padding: 0;
box-sizing: border-box;
}
.button {
  float: left;
  width: 60px;
  margin-left: 0px;
  border-radius: 8px 8px 8px 8px;
  background-color: #7e69ff;
}
.view {/*The inbox */
display: flex;
justify-content: center;
min-height: 100vh;
}
.view label {/*Idk yet*/
display: block;
margin-bottom: 5px;
color: #AAA;
font-size: 16px;
transition: 0.4s;
}
input[type="submit"] {/*Send button */
appearance: none;
border: none;
outline: none;
background: none;
display: block;
width: 100%;
padding: 10px 15px;
background-color: #7e69ff;
border-radius: 8px;
color: #FFF;
font-size: 18px;
font-weight: 700;
}
.chat {/* */
flex-direction: column;
}
.chat header {/*Where it says inbox */
position: relative;
display: block;
width: 100%;
padding: 10px 30px 10px;
background: #1F2135;
margin-top: 50px;
}
h1 {
color: #FFF;
}
.chat-box { /*Area/container where chat messages will appear */
background-color: #262942;
width: 100%;
top: 0;
bottom: 0;
height: 100%;
box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
flex: 1 1 100%;
padding: 30px;
color: white;
overflow-x: hidden;
overflow-y: scroll;
}
.content { /* */
display: inline-block;
padding: 10px 20px;
background-color: #343859;
border-radius: 999px;
color: #333;
font-size: 18px;
line-height: 1.2em;
text-align: left;
}
footer { /*Area at the bottom */
position: sticky;
bottom: 0px;
background-color: #1F2135;
padding: 30px;
box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
}
form { /*Where you write the message */
display: flex;
}
form input[type="text"] { /*Where you write the message */
flex: 1 1 100%;
appearance: none;
border: none;
outline: none;
background: none;
display: block;
width: 100%;
padding: 10px 15px;
border-radius: 8px 0px 0px 8px;
color: white;
font-size: 18px;
box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
background-color: #343859;
transition: 0.4s;
}
input[type="submit"] { /*send button */
appearance: none;
border: none;
outline: none;
background: none;
display: block;
padding: 10px 15px;
border-radius: 0px 8px 8px 0px;
background-color: #7e69ff;
color: #FFF;
font-size: 18px;
font-weight: 700;
width: 100px;
}
.message {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  background-color: lightskyblue;
  border-radius: 16px;
  color: #333;
  font-size: 80%;
  line-height: 1.2em;
  text-align: left;
  margin-left: 160px;
}
.match-message {
  background-color: lightgreen;
  margin-right: 250px;
  margin-left: 0;
}
.timestamp {
  position: absolute;
  text-align: right;
  right: 5px;
  bottom: 2px;
  font-size: 80%;
  font-weight: bold;
  line-height: 1.2em;
  display: inline-block;
  padding: 10px 20px;
  color: #333;
}
.chat-box .message {
display: flex;
margin-bottom: 15px;
}
.message .content {
display: inline-block;
padding: 10px 20px;
background-color: #F3F3F3;
border-radius: 999px;
color: #333;
font-size: 18px;
line-height: 1.2em;
text-align: left;
}
}
@media screen and (max-width: 768px) { /********************** SMALLER SCREENS */
* {/* Entire page */
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
margin: 0;
padding: 0;
box-sizing: border-box;
}
.button {
  float: left;
  width: 60px;
  margin-left: 0px;
  border-radius: 8px 8px 8px 8px;
  background-color: #7e69ff;
}
.view {/*The inbox */
display: flex;
justify-content: center;
min-height: 100vh;
}
.view label {/*Idk yet*/
display: block;
margin-bottom: 5px;
color: #AAA;
font-size: 16px;
transition: 0.4s;
}
input[type="submit"] {/*Send button */
appearance: none;
border: none;
outline: none;
background: none;
display: block;
width: 100%;
padding: 10px 15px;
background-color: #7e69ff;
border-radius: 8px;
color: #FFF;
font-size: 18px;
font-weight: 700;
}
.chat {/* */
flex-direction: column;
}
.chat header {/*Where it says inbox */
position: relative;
display: block;
width: 100%;
padding: 10px 30px 10px;
background: #1F2135;
margin-top: 50px;
}
h1 {
color: #FFF;
}
.chat-box { /*Area/container where chat messages will appear */
background-color: #262942;
width: 100%;
top: 0;
bottom: 0;
height: 100%;
box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
flex: 1 1 100%;
padding: 30px;
color: white;
overflow-x: hidden;
overflow-y: scroll;
}
.content { /* */
display: inline-block;
padding: 10px 20px;
background-color: #343859;
border-radius: 999px;
color: #333;
font-size: 18px;
line-height: 1.2em;
text-align: left;
}
footer { /*Area at the bottom */
position: sticky;
bottom: 0px;
background-color: #1F2135;
padding: 30px;
box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
}
form { /*Where you write the message */
display: flex;
}
form input[type="text"] { /*Where you write the message */
flex: 1 1 100%;
appearance: none;
border: none;
outline: none;
background: none;
display: block;
width: 100%;
padding: 10px 15px;
border-radius: 8px 0px 0px 8px;
color: white;
font-size: 18px;
box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
background-color: #343859;
transition: 0.4s;
}
input[type="submit"] { /*send button */
appearance: none;
border: none;
outline: none;
background: none;
display: block;
padding: 10px 15px;
border-radius: 0px 8px 8px 0px;
background-color: #7e69ff;
color: #FFF;
font-size: 18px;
font-weight: 700;
width: 100px;
}
.message {
  position: relative;
  display: inline-block;
  padding: 10px 20px 20px;
  background-color: lightskyblue;
  border-radius: 16px;
  color: #333;
  font-size: 80%;
  line-height: 1.2em;
  text-align: left;
  margin-left: 160px;
}
.match-message {
  background-color: lightgreen;
  margin-left: 0;
}
.timestamp {
  position: absolute;
  text-align: right;
  right: 5px;
  bottom: 2px;
  font-size: 80%;
  font-weight: bold;
  line-height: 1.2em;
  display: inline-block;
  padding: 10px 20px 0px;
  color: #333;
}
.chat-box .message {
display: flex;
margin-bottom: 15px;
}
.message .content {
display: inline-block;
padding: 10px 20px;
background-color: #F3F3F3;
border-radius: 999px;
color: #333;
font-size: 18px;
line-height: 1.2em;
text-align: left;
}
}
</style>
