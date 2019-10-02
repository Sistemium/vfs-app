<template lang="pug">

.service-point(v-if="servicePoint")

  .address(v-text="servicePoint.address")

</template>
<script>

import ServicePoint from '@/models/ServicePoint';

const NAME = 'ServicePoint';

export default {
  data() {
    return { servicePoint: null };
  },
  created() {
    this.$watch('$route.params.servicePointId', servicePointId => {
      ServicePoint.bindOne(this, servicePointId, 'servicePoint');
    }, { immediate: true });
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
