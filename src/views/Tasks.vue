<template lang="pug">

.tasks.service-points

  template(v-if="isRootState")

    nav-header.root-header(
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
        v-model="searchText"
      )

  nav-header(v-else title="Aptarnavimo taškas" :prev="backClick")

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
import ServicePointsProto from './ServicePointsProto';
import ServicePointList from '@/components/ServicePointList.vue';
import { servingGetters } from '@/vuex/serving/maps';
import { SET_SERVING_MONTH } from '@/vuex/serving/actions';
import { CURRENT_SERVING_MONTH } from '@/vuex/serving/getters';

const { mapActions, mapGetters } = createNamespacedHelpers('serving');
const NAME = 'Tasks';

export default {
  // data() {
  //   return { month: null };
  // },
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
        isServed: () => {
          if (servicePoint.isServedBetween(this.month, `${this.month}-31`)) {
            return 'el-icon-circle-check';
          }
          return null;
        },
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

</style>
<style lang="scss">

@import "../styles/variables";

.service-points .root-header {

  justify-content: stretch;

  .left, .right {
    display: none;
  }

  .title {
    flex: 1;
  }

  .month-picker {
    margin-left: $margin-right;
    max-width: 100px;

    .el-input__prefix {
      top: -4px;
    }

    .el-input__inner {
      padding-right: 0;
    }
  }

}

</style>
