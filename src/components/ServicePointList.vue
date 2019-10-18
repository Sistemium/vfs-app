<template lang="pug">

items-list.service-point-list(
  :items="servicePoints"
  gray-prop="address"
  title-prop="serviceContract.customer.name"
  @click="onClick"
)

</template>
<script>

export default {

  props: { servicePoints: Array },
  name: 'ServicePointList',
  methods: {
    onClick(servicePoint) {
      this.$emit('click', servicePoint);
    },
  },

};

</script>
