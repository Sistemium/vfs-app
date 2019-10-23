<template lang="pug">

.service-point-info(v-if="servicePoint")

  .address.field
    i.el-icon-location-information
    span {{ servicePoint.address }}
    small(v-if="servicePoint.name") ({{ servicePoint.name }})

  template(v-if="serviceContract")
    .customer.field
      i.el-icon-s-custom
      span.name(v-text="serviceContract.customer.name")
    .contract.field
      i.el-icon-s-management
      span № {{ serviceContract.num }} nuo {{ serviceContract.date }}

</template>
<script>

const NAME = 'ServicePointInfo';

export default {
  props: {
    servicePoint: Object,
  },
  computed: {
    serviceContract() {
      return this.servicePoint && this.servicePoint.serviceContract;
    },
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/forms";

.service-point-info {
  @extend %form;
}

</style>
