<template>
    <div>
        <div>Match id: {{ match._id }}</div>
        <div>was created at: {{ match.createdAt }}</div>
        <div>was updated at: {{ match.updatedAt }}</div>
    </div>
</template>

<script>
export default {
  name: 'match-item',
  props: ['match']
}
</script>
