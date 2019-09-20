<template lang="pug">

.points
  h2 Aptarnavimo taškai

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import * as a from '@/vuex/serving/actions';

const { mapActions } = createNamespacedHelpers('serving');

export default {
  name: 'Points',
  methods: {
    ...mapActions({
      loadServicePoints: a.LOAD_SERVICE_POINTS,
    }),
  },
  async created() {
    await this.loadServicePoints();
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
