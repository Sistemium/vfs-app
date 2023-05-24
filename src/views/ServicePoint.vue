<template lang="pug">

.service-point(v-if="servicePoint")

  service-point-info(:service-point="servicePoint")

  .service-item(
    v-for="item in serviceItems"
    :key="item.id"
  )
    //h4 {{ filterSystemName(item) }}
    nav-header(
      :title="filterSystemName(item)"
      :subtitle="item.info"
      :next="() => serviceItemEdit(item)"
      right-icon="el-icon-edit"
    )
    service-item-info(
      :service-item="item"
    )

</template>
<script>

import ServiceItemInfo from '@/components/ServiceItemInfo.vue';
import ServicePointInfo from '@/components/ServicePointInfo.vue';
import * as svc from '@/services/serving';
import ServicePoint from '@/models-vuex/ServicePoint';
import FilterSystem from '@/models-vuex/FilterSystem';
import { servingGetters } from '@/vuex/serving/maps';

const NAME = 'ServicePoint';

export default {

  computed: {
    currentServingMaster: servingGetters.currentServingMaster,
    servicePointId() {
      return this.$route.params.servicePointId;
    },
    servicePoint() {
      return ServicePoint.reactiveGet(this.servicePointId);
    },
    serviceItems() {
      return svc.serviceItemsByServicePointId(this.servicePointId, this.currentServingMaster.id);
    },
    serviceItemServices() {
      return svc.servicesByServicePointId(this.servicePointId);
    },
  },

  methods: {
    filterSystemName({ filterSystemId }) {
      const { name } = FilterSystem.reactiveGet(filterSystemId) || {};
      return name;
    },
    serviceItemEdit(item) {
      this.$debug('serviceItemEdit', item);
      const path = `${this.$route.path}/itemEdit/${item.id}`;
      this.$router.push({ path });
    },
  },

  name: NAME,

  async created() {
    await svc.loadServiceItemService(this.servicePointId);
  },

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

  position: sticky;
  top: 0;

}

</style>
