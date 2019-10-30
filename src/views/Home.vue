<template lang="pug">

.home

  img(alt="Vue logo" src="../assets/vfs-drops-192.png")

  hello-world(msg="VFS mobiliajam")

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

<style scoped lang="css">
img {
  margin-top: 30px;
  max-width: 200px;
}
</style>
