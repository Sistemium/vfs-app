<template lang="pug">

.about

  nav-header(
    :title="title"
    right-icon="el-icon-refresh"
    left-icon="rank"
    :next="reloadApp"
    :prev="toggleProfileClick"
  )

  img(alt="Vue logo" src="../assets/vfs-drops-192.png")

  account-info
  current-serving-master

</template>

<script>

import { toggleTabBar, isNative } from 'sistemium-vue/services/native';
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
    toggleProfileClick() {
      if (isNative()) {
        toggleTabBar();
      }
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
