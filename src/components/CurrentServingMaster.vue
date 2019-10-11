<template lang="pug">

.current-serving-master

  .chosen(v-if="currentServingMaster")
    label Meistras:
    strong(v-text="currentServingMaster.name")
    mt-button.change(small="small" @click="chooseMaster")
      i.el-icon-s-unfold
  .not-chosen(v-else)
    mt-button(type="primary" @click="chooseMaster") Pasirinkti meistrą

</template>
<script>

import { servingGetters } from '@/vuex/serving/maps';

const NAME = 'CurrentServingMaster';

export default {
  name: NAME,
  computed: { currentServingMaster: servingGetters.currentServingMaster },
  methods: {
    chooseMaster() {
      this.$router.push({
        name: 'ChooseServingMaster',
        query: { from: this.$route.fullPath },
      });
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

strong {
  margin: 0 $margin-right;
}

.change {
  height: 30px;
  padding: 0 5px;
}

</style>
