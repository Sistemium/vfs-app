<template lang="pug">

#app(
  v-loading.fullscreen.lock="authorizing"
  element-loading-text="Įgaliojimas ..."
)
  router-view(v-if="authorized")
  auth(v-else)

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import { IS_AUTHORIZED, IS_AUTHORIZING } from '@/vuex/auth/getters';
import Auth from '@/views/Auth.vue';

const { mapGetters } = createNamespacedHelpers('auth');

export default {
  components: { Auth },
  computed: {
    ...mapGetters({
      authorizing: IS_AUTHORIZING,
      authorized: IS_AUTHORIZED,
    }),
  },
};

</script>
<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
