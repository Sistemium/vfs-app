<template lang="pug">

.about
  nav-header(title="Apie programėlę")

  img(alt="Vue logo" src="../assets/vfs-1024.png")

  p Vandens Filtravimo Sistemos

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
