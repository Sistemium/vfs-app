<template lang="pug">

.points

  nav-header(v-if="isRootState" title="Aptarnavimo taškai")
  nav-header(v-else title="Aptarnavimo taškas" :prev="backClick")

  service-point-list.list(
    v-if="isRootState"
    :service-points="servicePoints"
    @click="setCurrentServicePoint"
  )

  router-view

</template>
<script>

import serving from '@/vuex/serving/maps';
import ServicePointList from '@/components/ServicePointList.vue';

const NAME = 'ServicePoints';

export default {

  methods: {
    loadServicePoints: serving.actions.loadServicePoints,
    setCurrentServicePoint(servicePoint) {
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

  async created() {
    await this.loadServicePoints();
  },

  components: { ServicePointList },
  name: NAME,

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.points {

  display: flex;
  flex-direction: column;

  > h2 {
    margin: 0;
  }

}

.list {
  flex: 1;
  overflow-y: scroll;
}

</style>
