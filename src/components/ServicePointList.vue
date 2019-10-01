<template lang="pug">

.service-point-list.cell-list

  list-item(
    v-for= "servicePoint in servicePoints"
    :key="servicePoint.id"
    :gray="servicePoint.address"
    :title="servicePoint.name"
    @click="$emit('click', servicePoint)"
  )

</template>
<script>

const NAME = 'ServicePointList';

export default {

  props: { servicePoints: Array },

  methods: {},

  name: NAME,

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
