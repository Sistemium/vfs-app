<template lang="pug">

.service-item-info(v-if="serviceItem")
  //.filter-system
    i.el-icon-s-flag
    span(v-text="serviceItem.filterSystem.name")
    small(v-text="serviceItem.info")

  form-field(label="Kitas aptarnavimas" :text="serviceItem.plannedServiceDate")
  form-field(label="Sumontuota" :text="serviceItem.installingDate")
  //form-field(label="Aptarnauta" :text="serviceItem.lastServiceDate")
  form-field(label="Garantija iki" :text="serviceItem.guaranteeEnd" empty-text="Nera garatijos")

  template(v-if="serviceItem.services.length")
    h4 Aptarnavimo istorija:
    .services
      service-item-services-list(:service-item-services="serviceItem.services")

</template>
<script>

import ServiceItemServicesList from '@/components/ServiceItemServicesList.vue';

const NAME = 'ServiceItemInfo';

export default {
  components: { ServiceItemServicesList },
  props: {
    serviceItem: Object,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/forms";

.service-item-info {
  @extend %form;
}

.filter-system > small {
  margin-left: $margin-right;
}

small {
  color: $gray;
}

h4 {
  color: $gray;
  text-align: center;
  font-weight: normal;
}

</style>
