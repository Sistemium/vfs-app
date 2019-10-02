<template lang="pug">

.home

  img(alt="Vue logo" src="../assets/vfs-1024.png")

  hello-world(msg="Welcome to VFS")

  router-link(to="tabs")
    mt-button(type="primary") Pradėti

</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};

</script>

<style lang="css">
img {
  max-width: 200px;
}
</style>
