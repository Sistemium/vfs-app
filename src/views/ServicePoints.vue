<template lang="pug">

.service-points

  template(v-if="isRootState")

    nav-header.root-header
      strong Aptarnavimo taškai
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

const NAME = 'ServicePoints';
// const { debug, error } = log(NAME);

export default {

  methods: {},

  computed: {
    servicePoints: servingGetters.matchingServicePoints,
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
