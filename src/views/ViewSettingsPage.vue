<template lang="pug">

.view-settings-page

  mt-radio(
    title="Taškų rūšiavimas"
    v-model="sortOrder"
    :options="sortOptions"
  )

</template>
<script>

import { servingGetters, servingActions } from '@/vuex/serving/maps';
import { POINTS_SORTING_OPTIONS } from '@/services/serving';

export default {
  name: 'ViewSettingsPage',
  computed: {
    sortOrder: {
      get: servingGetters.pointsSorting,
      set: servingActions.setPointsSorting,
    },
    sortOptions() {
      return Array.from(POINTS_SORTING_OPTIONS, ([value, { label }]) => ({
        value,
        label,
      }));
    },
  },
  methods: {},
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.view-settings-page {
  text-align: left;
}

</style>
