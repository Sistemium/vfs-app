<template lang="pug">

.service-points

  template(v-if="isRootState")

    nav-header(title="Aptarnavimo taškai")
    service-point-list.list(
      :service-points="servicePoints"
      @click="servicePointClick"
    )

  nav-header(v-else title="Aptarnavimo taškas" :prev="backClick")

  router-view

</template>
<script>

import store from '@/vuex/index';
import { servingGetters } from '@/vuex/serving/maps';
import { LOAD_SERVICE_POINTS } from '@/vuex/serving/actions';
import { CURRENT_SERVING_MASTER } from '@/vuex/serving/getters';
import ServicePointList from '@/components/ServicePointList.vue';
import log from 'sistemium-telegram/services/log';

const NAME = 'ServicePoints';
const { debug } = log(NAME);

export default {

  methods: {
    servicePointClick(servicePoint) {
      this.$router.push({
        name: 'ServicePoint',
        params: { servicePointId: servicePoint.id },
      });
    },
    backClick() {
      this.$router.push({ name: NAME });
    },
  },

  computed: {
    servicePoints: servingGetters.servicePoints,
    isRootState() {
      return this.$route.name === NAME;
    },
  },

  async beforeRouteEnter(to, from, next) {
    debug('beforeRouteEnter', to.fullPath, from.fullPath);

    const currentServingMaster = store.getters[`serving/${CURRENT_SERVING_MASTER}`];

    if (!currentServingMaster) {
      next({
        name: 'ChooseServingMaster',
        query: { from: to.fullPath },
      });
      return;
    }

    try {
      await store.dispatch(`serving/${LOAD_SERVICE_POINTS}`, currentServingMaster.id);
      next();
    } catch (e) {
      await store.dispatch('routingError', {
        to,
        from,
        error: e,
      });
    }
  },

  components: { ServicePointList },
  name: NAME,

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.service-points {
  display: flex;
  flex-direction: column;
}

.list {
  flex: 1;
  overflow-y: scroll;
}

</style>
