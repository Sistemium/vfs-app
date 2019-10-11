<template lang="pug">

.about
  nav-header(title="Apie programėlę")

  p Vandens Filtravimo Sistemos

  img(alt="Vue logo" src="../assets/vfs-1024.png")

  account-info
  current-serving-master

</template>

<script>

import AccountInfo from '@/components/AccountInfo.vue';
import CurrentServingMaster from '@/components/CurrentServingMaster.vue';

export default {
  components: {
    AccountInfo,
    CurrentServingMaster,
  },
};

</script>
<style lang="scss" scoped>
@import "../styles/variables";
p {
  color: $blue;
  font-weight: bold;
  padding: $margin-right;
}

</style>
