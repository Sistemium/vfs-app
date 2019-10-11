<template lang="pug">

.current-serving-master
  p
    label Meistras:
    strong(v-text="currentServingMaster.name")

</template>
<script>

import { servingGetters } from '@/vuex/serving/maps';

const NAME = 'CurrentServingMaster';

export default {
  name: NAME,
  computed: { currentServingMaster: servingGetters.currentServingMaster },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";
label {
  margin-right: $margin-right;
}

</style>
