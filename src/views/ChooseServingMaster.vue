<template lang="pug">

.current-serving-master
  nav-header(title="Pasirinkite meistrą" :prev="goBack")
  serving-masters-choice

</template>
<script>

import { servingGetters } from '@/vuex/serving/maps';
import ServingMastersChoice from '@/components/ServingMastersChoice.vue';

const NAME = 'ChooseServingMaster';

export default {
  name: NAME,
  components: { ServingMastersChoice },
  watch: {
    chosen() {
      this.goBack();
    },
  },
  computed: {
    chosen: servingGetters.currentServingMaster,
  },
  methods: {
    goBack() {
      const to = this.$route.query.from || '/';
      this.$router.push(to);
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
