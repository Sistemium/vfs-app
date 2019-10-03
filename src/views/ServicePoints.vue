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
import serving from '@/vuex/serving/maps';
import { LOAD_SERVICE_POINTS } from '@/vuex/serving/actions';
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
    servicePoints: serving.getters.servicePoints,
    isRootState() {
      return this.$route.name === NAME;
    },
  },

  async beforeRouteEnter(to, from, next) {
    debug('beforeRouteEnter', to.fullPath, from.fullPath);
    try {
      await store.dispatch(`serving/${LOAD_SERVICE_POINTS}`);
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
