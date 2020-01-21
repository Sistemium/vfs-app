<template lang="pug">

.service-point(v-if="servicePoint")

  service-point-info(:service-point="servicePoint")

  .service-item(
    v-for="item in serviceItems"
    :key="item.id"
  )
    h4 {{ item.filterSystem.name }}
    service-item-info(
      :service-item="item"
    )

</template>
<script>

import first from 'lodash/first';
import ServiceItemInfo from '@/components/ServiceItemInfo.vue';
import ServicePointInfo from '@/components/ServicePointInfo.vue';
import * as svc from '@/services/serving';

const NAME = 'ServicePoint';

export default {

  computed: {
    servicePointId() {
      return this.$route.params.servicePointId;
    },
    servicePoint() {
      return first(svc.servicePointByIds([this.servicePointId]));
    },
    serviceItems() {
      return svc.serviceItemsByServicePointId(this.servicePointId);
    },
    serviceItemServices() {
      return svc.loadServiceItemService(this.servicePointId);
    },
  },

  name: NAME,

  components: {
    ServicePointInfo,
    ServiceItemInfo,
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.service-point > * {
  margin: $margin-top 0;
}

span + small {
  margin-left: $margin-right;
}

h4 {
  background-color: $gray-background;
  padding: 3px 0;
  margin: 0;

  // TODO: figure out why not working
  position: static;

}

</style>
