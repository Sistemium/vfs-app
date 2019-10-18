<template lang="pug">

.list-item(@click="$emit('click')")
  slot(name="title" v-if="title")
    .title(v-text="title")
  slot(name="gray" v-if="gray")
    .gray(v-text="gray")


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

@import "../styles/variables";

.list-item {

  padding: 6px;
  text-align: left;

}

.gray {
  color: $gray;
  font-size: small;
}

</style>
