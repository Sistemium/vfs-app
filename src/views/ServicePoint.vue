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
    ServicePoint.bindOne(this, this.$route.params.servicePointId, 'servicePoint');
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
