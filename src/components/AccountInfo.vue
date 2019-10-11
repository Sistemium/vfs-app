<template lang="pug">

.account-info
  p
    label Naudotojas:
    strong(v-text="account.name")

</template>
<script>

import { authGetters } from '@/vuex/auth/maps';

const NAME = 'AccountInfo';

export default {
  name: NAME,
  computed: authGetters,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

label {
  margin-right: $margin-right;
}

</style>
