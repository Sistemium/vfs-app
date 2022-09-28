<template lang="pug">

.tasks.service-points

  template(v-if="isRootState")

    nav-header.root-header(
      :next="settingsClick"
      right-icon="el-icon-setting"
    )
      strong
        span Užduotys
        el-date-picker.month-picker(
          v-model="month"
          type="month"
          value-format="yyyy-MM"
          :editable="false"
          :clearable="false"
          placeholder="mėnesį"
        )
      search-input(
        size="mini"
        slot="bottom"
        v-model="searchText"
      )

  nav-header(v-else :title="childTitle" :prev="backClick")

  .list
    service-point-list(
      :style="isRootState ? '' : 'width:0'"
      :service-points="tasks"
      icon-fn="isServed"
      @click="servicePointClick"
    )

    router-view

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import ServicePointList from '@/components/ServicePointList.vue';
import { servingGetters } from '@/vuex/serving/maps';
import { SET_SERVING_MONTH } from '@/vuex/serving/actions';
import { CURRENT_SERVING_MONTH } from '@/vuex/serving/getters';
import ServicePointsProto from './ServicePointsProto';
// import ServicePoint from '@/models-vuex/ServicePoint';

const {
  mapActions,
  mapGetters,
} = createNamespacedHelpers('serving');
const NAME = 'Tasks';

export default {
  methods: {},
  computed: {
    servicePoints: servingGetters.matchingServiceTasks,
    month: {
      ...mapGetters({ get: CURRENT_SERVING_MONTH }),
      ...mapActions({ set: SET_SERVING_MONTH }),
    },
    tasks() {
      return this.servicePoints.map(servicePoint => ({
        ...servicePoint,
        serviceContract: servicePoint.serviceContract,
        title: servicePoint.title,
        isServed: servicePoint.isServed && 'el-icon-circle-check',
      }));
    },
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

.tasks.service-points .root-header {
  strong {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }
}

.service-points .root-header {

  .month-picker {
    margin-left: $margin-right;
    max-width: 120px;
    ::v-deep .el-input__icon {
      line-height: 32px;
    }
  }

}

</style>
