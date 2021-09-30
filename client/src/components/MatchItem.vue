<template>
    <div>
        <div>Match {{ match._id }}</div>
        <div> was created at {{ match.createdAt }}</div>
    </div>
</template>

<script>
export default {
  name: 'match-item',
  props: ['match']
}
</script>
