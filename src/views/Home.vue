<template lang="pug">

.home

  img(alt="Vue logo" src="../assets/logo.png")

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
