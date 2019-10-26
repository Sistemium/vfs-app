<template lang="pug">

.list-item(@click="$emit('click')")
  .texts
    slot(name="title" v-if="title")
      .title(v-text="title")
    slot(name="gray" v-if="gray")
      .gray(v-text="gray")
  slot(name="right")

</template>
<script>

const NAME = 'ListItem';

export default {
  props: {
    title: String,
    gray: String,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/lists";

</style>
