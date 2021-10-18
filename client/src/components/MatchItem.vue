<template>
    <div class="match-info">
        <b-avatar variant="primary" src="matches.avatarUrl" class="mr-3"></b-avatar>
        <div>Match id: {{ match._id }}</div>
        <div>was created at: {{ match.createdAt }}</div>
        <div>was updated at: {{ match.updatedAt }}</div>
    <b-button v-on:click.prevent="$emit('del-match', match._id)">Delete( );</b-button>
    </div>
</template>

<script>
export default {
  name: 'match-item',
  props: ['match']
}
</script>

<style scoped>
.match-info {
  color: white;
}
</style>
