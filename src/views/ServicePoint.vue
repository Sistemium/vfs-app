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

import store from '@/vuex/index';
import ServicePoint from '@/models/ServicePoint';
import ServiceItem from '@/models/ServiceItem';
import ServiceItemService from '@/models/ServiceItemService';
import ServiceItemInfo from '@/components/ServiceItemInfo.vue';
import ServicePointInfo from '@/components/ServicePointInfo.vue';
import log from 'sistemium-telegram/services/log';
import { LOAD_SERVICE_ITEM_SERVICE } from '@/vuex/serving/actions';

const NAME = 'ServicePoint';
const { debug, error } = log(NAME);

export default {
  data() {
    return {
      servicePoint: null,
      serviceItems: [],
      serviceItemServices: [],
    };
  },
  created() {
    this.$watch('$route.params.servicePointId', servicePointId => {
      ServiceItem.bindAll(this, { servicePointId }, 'serviceItems');
      ServicePoint.bindOne(this, servicePointId, 'servicePoint');
      ServiceItemService.bindAll(this, { servicePointId }, 'serviceItemServices');
    }, { immediate: true });
  },
  name: NAME,
  components: {
    ServicePointInfo,
    ServiceItemInfo,
  },
  async beforeRouteEnter(to, from, next) {
    debug('beforeRouteEnter', to.fullPath, from.fullPath);
    try {
      await store.dispatch(`serving/${LOAD_SERVICE_ITEM_SERVICE}`, to.params.servicePointId);
      next();
    } catch (e) {
      error('beforeRouteEnter', e);
      await store.dispatch('routingError', {
        to,
        from,
        error: e,
      });
    }
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
