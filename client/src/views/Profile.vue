<template>
<div>
    <b-img class="programmr-logo" :src="require('../assets/squarelogo.svg')"></b-img>
    <!--<h1>Profile for user id: {{ $route.params.id }}</h1>-->
    <profile-item/>
</div>
</template>

<script>
import ProfileItem from '../components/ProfileItem.vue'

export default {
  name: 'profile',
  components: {
    'profile-item': ProfileItem
  }
}

</script>
<style scoped>
h1 {
    color: white;
    font-weight: bold;
}
</style>
