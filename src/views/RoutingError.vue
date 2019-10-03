<template lang="pug">

.routing-error

  nav-header(title="Klaida")

  img(alt="Vue logo" src="../assets/icons8-error-256.png")

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
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
