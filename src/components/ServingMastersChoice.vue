<template lang="pug">

resize.serving-masters-choice(:padding="0")
  items-list(
    :items="items"
    title-prop="name"
    @click="setCurrentServingMaster"
    :current-item-id="current && current.id"
  )

</template>
<script>

import { servingGetters, servingActions } from '@/vuex/serving/maps';

const NAME = 'ServingMastersChoice';

export default {
  name: NAME,
  computed: {
    items: servingGetters.servingMasters,
    current: servingGetters.currentServingMaster,
  },
  methods: {
    setCurrentServingMaster: servingActions.setCurrentServingMaster,
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
