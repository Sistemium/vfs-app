<template lang="pug">

.view-settings-page

  mt-radio(
    title="Taškų rūšiavimas"
    v-model="sortOrder"
    :options="sortOptions"
  )

  .mint-radiolist-title Kiti nustatymai

  .page-part
    mt-cell
      span(slot="title") Rodyti atliktas užduotis
      mt-switch(v-model="showDoneTasks")

</template>
<script>

import { servingGetters, servingMutations } from '@/vuex/serving/maps';
import { POINTS_SORTING_OPTIONS } from '@/services/serving';

export default {
  name: 'ViewSettingsPage',
  computed: {
    sortOrder: {
      get: servingGetters.pointsSorting,
      set: servingMutations.setPointsSorting,
    },
    showDoneTasks: {
      get: servingGetters.showDoneTasks,
      set: servingMutations.setShowDoneTasks,
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
