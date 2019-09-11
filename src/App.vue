<template lang="pug">

#app
  //#nav
    router-link(to="/") Home
    span |
    router-link(to="/about") About
  router-view(v-if="authorized")
  auth(v-else)

</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import { IS_AUTHORIZED } from '@/vuex/auth/getters';
import Auth from '@/views/Auth.vue';

const { mapGetters } = createNamespacedHelpers('auth');


export default {
  components: { Auth },
  computed: {
    ...mapGetters({
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

#nav {

  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  > span {
    margin: 0 10px;
  }

}

</style>
