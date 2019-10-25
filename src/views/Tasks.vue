<template lang="pug">

.tasks.service-points

  template(v-if="isRootState")

    nav-header.root-header
      strong Užduotys
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

const NAME = 'Tasks';

export default {
  computed: {
    servicePoints: servingGetters.matchingServiceTasks,
  },
  components: {
    ServicePointList,
  },
  name: NAME,
  mixins: [ServicePointsProto(NAME, 'TaskServicePoint')],
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
