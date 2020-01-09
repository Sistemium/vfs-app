<template lang="pug">

.service-point-list
  list-item(
    v-for="item in servicePoints"
    :key="item.id"
    :gray="item.address"
    :title="title(item)"
    @click="onClick(item)"
  )
    template(v-slot:right v-if="iconFn")
      .right
        i(:class="icon(item)")

</template>
<script>

import ServiceItemService from '@/models-vuex/ServiceItemService';

export default {

  props: {
    servicePoints: Array,
    iconFn: String,
  },
  name: 'ServicePointList',
  methods: {
    title(servicePoint) {
      return servicePoint.title();
    },
    onClick(servicePoint) {
      this.$emit('click', servicePoint);
    },
    icon(servicePoint) {
      return this.iconFn && servicePoint[this.iconFn]();
    },
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.right {
  padding: 0 $padding;
  color: green;
  i {
    font-size: 150%;
  }
}
</style>
