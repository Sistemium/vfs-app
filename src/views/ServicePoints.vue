<template lang="pug">

.service-points

  template(v-if="isRootState")

    nav-header.root-header(
      :next="settingsClick"
      right-icon="el-icon-setting"
    )
      strong {{ title }}
      search-input(
        slot="bottom"
        size="mini"
        v-model="searchText"
      )

  nav-header(v-else :title="childTitle" :prev="backClick")

  .list
    service-point-list(
      :style="isRootState ? '' : 'width:0'"
      :service-points="servicePoints"
      @click="servicePointClick"
    )

    router-view


</template>
<script>

import ServicePointList from '@/components/ServicePointList.vue';
import { servingGetters } from '@/vuex/serving/maps';
import { pausedServicePoints, servingServicePoints } from '@/services/serving';
import ServicePointsProto from './ServicePointsProto';

const NAME = 'ServicePoints';
const STATUSES = {
  serving: {
    title: 'Aptarnavimo taškai',
    listFn: servingServicePoints,
  },
  paused: {
    title: 'Sustabdyti taškai',
    listFn: pausedServicePoints,
  },
};

export default {

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

  methods: {},

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
