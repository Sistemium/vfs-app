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
import { authGetters } from '@/vuex/auth/maps';

const NAME = 'ServingMastersChoice';

export default {
  name: NAME,
  computed: {
    roles: authGetters.roles,
    account: authGetters.account,
    servingMasters: servingGetters.servingMasters,
    current: servingGetters.currentServingMaster,
    items() {
      const { Master } = this.roles;
      const res = this.servingMasters;
      if (Master) {
        return res.filter(({ accountId }) => accountId === this.account.id);
      }
      return res;
    },
  },
  methods: {
    setCurrentServingMaster: servingActions.setCurrentServingMaster,
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
