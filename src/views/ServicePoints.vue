<template lang="pug">

.service-points

  template(v-if="isRootState")

    nav-header.root-header
      strong {{ title }}
      search-input(
        size="mini"
        v-model="searchText"
      )

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

import ServicePointsProto from './ServicePointsProto';
import ServicePointList from '@/components/ServicePointList.vue';
import { servingGetters } from '@/vuex/serving/maps';
import { pausedServicePoints, servingServicePoints } from '@/services/serving';

const NAME = 'ServicePoints';
const STATUSES = {
  serving: {
    title: 'Aptarnavimo taškai',
    listFn: servingServicePoints,
  },
  paused: {
    title: 'Sustabdytas taškai',
    listFn: pausedServicePoints,
  },
};

export default {

  methods: {},

  computed: {
    servicePointsAll: servingGetters.matchingServicePoints,
    servicePoints() {
      const { listFn } = STATUSES[this.status];
      return listFn(this.servicePointsAll);
    },
    title() {
      return STATUSES[this.status].title;
    },
  },

  props: {
    status: {
      type: String,
      default: 'serving',
    },
  },

  components: {
    ServicePointList,
  },

  mixins: [ServicePointsProto(NAME, 'ServicePoint')],

  name: NAME,

};

</script>
<style scoped lang="scss">

@import "../styles/servicePointsProto";

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
