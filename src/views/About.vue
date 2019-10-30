<template lang="pug">

.about

  nav-header(:title="title" right-icon="el-icon-refresh" :next="reloadApp")

  img(alt="Vue logo" src="../assets/vfs-drops-192.png")

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
  methods: {
    reloadApp() {
      window.location.reload(true);
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
