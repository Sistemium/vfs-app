<template lang="pug">

#app(
  v-loading.fullscreen.lock="busy"
  :element-loading-text="`${busy} ...`"
)
  router-view

</template>
<script>

import { servingGetters } from '@/vuex/serving/maps';
import { createNamespacedHelpers } from 'vuex';
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
      if (this.busyServing) {
        return 'Įkeliami duomenys';
      }
      return '';
    },
  },
};

</script>
