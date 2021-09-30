<template>
    <div>
        <b-button variant="danger" v-on:click="$emit('del-match', match._id)">X</b-button>
        <div>User {{ match.firstName }}</div>
        <div class="detail"> with id {{ match._id }}</div>
    </div>
</template>

<script>
export default {
  name: 'match-item',
  props: ['match']
}
</script>
