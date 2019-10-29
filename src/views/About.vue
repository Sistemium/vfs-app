<template lang="pug">

.about

  nav-header(:title="title")

  img(alt="Vue logo" src="../assets/vfs-1024.png")

  account-info
  current-serving-master

</template>

<script>

import AccountInfo from '@/components/AccountInfo.vue';
import CurrentServingMaster from '@/components/CurrentServingMaster.vue';

export default {
  computed: {
    title() {
      return `VFS mobile v${this.version}`;
    },
    version() {
      return process.env.VUE_APP_VERSION;
    },
  },
  components: {
    AccountInfo,
    CurrentServingMaster,
  },
};

</script>
<style lang="scss" scoped>

@import "../styles/variables";

img {
  margin-top: 20px;
}

</style>
