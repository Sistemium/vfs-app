<template lang="pug">

.service-item-service-info
  .service-item-service
    i.type(:class="[service.typeIcon, service.type]")
    .date(v-text="service.date")
    .info(v-text="service.info")

</template>
<script>

const NAME = 'ServiceItemServiceInfo';

export default {
  name: NAME,
  props: {
    service: Object,
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
