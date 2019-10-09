<template lang="pug">

.routing-error

  nav-header(title="Klaida")

  img(alt="Vue logo" src="../assets/icons8-error-256.png")

  template(v-if="routingError")
    p Nepavyko pereiti į:
      b {{ routingError.to.name }}

    router-link(:to="routingError.to")
      mt-button(type="primary") Pakartoti

</template>
<script>

import { mapGetters } from 'vuex';

const NAME = 'RoutingError';

export default {
  name: NAME,
  computed: {
    ...mapGetters({ routingError: 'routingError' }),
  },
  created() {
    if (!this.routingError) {
      this.$router.push('/');
    }
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

p b {
  margin-left: $margin-right;
}

</style>
