<template lang="pug">

#app(
  v-loading.fullscreen.lock="busy"
  :element-loading-text="`${busy} ...`"
)
  router-view

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import { servingGetters } from '@/vuex/serving/maps';
import { IS_AUTHORIZED, IS_AUTHORIZING } from '@/vuex/auth/getters';

const { mapGetters } = createNamespacedHelpers('auth');

export default {
  computed: {
    ...mapGetters({
      authorizing: IS_AUTHORIZING,
      authorized: IS_AUTHORIZED,
    }),
    busyServing: servingGetters.busy,
    busy() {
      if (this.authorizing) {
        return 'Autorizacija';
      }
      const { busyServing } = this;
      if (busyServing === true) {
        return 'Įkeliami duomenys';
      }
      if (busyServing) {
        return `Įkeliami ${busyServing}`;
      }
      return '';
    },
  },
};

</script>
