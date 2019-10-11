<template lang="pug">

.current-serving-master
  nav-header(title="Pasirinkite meistrą")
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
      const to = this.$route.query.from || '/';
      this.$router.push(to);
    },
  },
  computed: {
    chosen: servingGetters.currentServingMaster,
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
