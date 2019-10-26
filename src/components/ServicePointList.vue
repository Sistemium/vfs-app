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

import get from 'lodash/get';
import ServiceItemService from '@/models/ServiceItemService';

export default {

  props: {
    servicePoints: Array,
    iconFn: String,
  },
  name: 'ServicePointList',
  methods: {
    title(servicePoint) {
      return get(servicePoint.serviceContract, 'customer.name');
    },
    onClick(servicePoint) {
      this.$emit('click', servicePoint);
    },
    icon(servicePoint) {
      return this.iconFn && servicePoint[this.iconFn]();
    },
  },

  created() {
    ServiceItemService.bind(this);
  },

  beforeDestroy() {
    ServiceItemService.unbindAll(this);
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.right {
  padding: $padding;
  color: green;
  i {
    font-size: 150%;
  }
}
</style>
