<template lang="pug">

.serving-masters-choice
  items-list(:items="items" title-prop="name" @click="setCurrentServingMaster")

</template>
<script>

import { servingGetters, servingActions } from '@/vuex/serving/maps';

const NAME = 'ServingMastersChoice';

export default {
  name: NAME,
  computed: {
    items: servingGetters.servingMasters,
  },
  methods: {
    setCurrentServingMaster: servingActions.setCurrentServingMaster,
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
