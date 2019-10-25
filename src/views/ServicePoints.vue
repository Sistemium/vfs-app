<template lang="pug">

.service-points

  template(v-if="isRootState")

    nav-header.root-header
      strong Aptarnavimo taškai
      search-input(
        size="mini"
        v-model="searchText"
      )

    //.background
    //current-serving-master

  nav-header(v-else title="Aptarnavimo taškas" :prev="backClick")

  .list
    service-point-list(
      :style="isRootState ? '' : 'width:0'"
      :service-points="servicePoints"
      @click="servicePointClick"
    )

    router-view


</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import store from '@/vuex/index';
import { servingGetters } from '@/vuex/serving/maps';
import { LOAD_SERVICE_POINTS, SEARCH_TEXT_CHANGE } from '@/vuex/serving/actions';
import { CURRENT_SERVING_MASTER, SEARCH_TEXT } from '@/vuex/serving/getters';
import ServicePointList from '@/components/ServicePointList.vue';
import log from 'sistemium-telegram/services/log';
import CurrentServingMaster from '@/components/CurrentServingMaster.vue';
import SearchInput from '@/lib/SearchInput.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('serving');

const NAME = 'ServicePoints';
const { debug, error } = log(NAME);

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
    servicePoints: servingGetters.matchingServicePoints,
    isRootState() {
      return this.$route.name === NAME;
    },
    searchText: {
      ...mapGetters({ get: SEARCH_TEXT }),
      ...mapActions({ set: SEARCH_TEXT_CHANGE }),
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
      error('beforeRouteEnter', e);
      await store.dispatch('routingError', {
        to,
        from,
        error: e,
      });
    }
  },

  components: {
    SearchInput,
    CurrentServingMaster,
    ServicePointList,
  },

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
  display: flex;
  flex-direction: row;

  > * {
    width: 100%;
  }
}

.service-point-list {
  overflow-x: hidden;
}

.current-serving-master {
  background: $gray-background;
  padding-bottom: $margin-top;
}

.root-header {
  padding: $padding;
  strong {
    display: block;
    margin: $padding auto;
  }
}

</style>
<style lang="scss">

.service-points .root-header {

  justify-content: stretch;

  .left, .right {
    display: none;
  }

  .title {
    flex: 1;
  }

}

</style>
