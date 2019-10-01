<template lang="pug">

.list-item(@click="$emit('click')")
  slot(name="title" v-text="title")
    .title(v-text="title")
  slot(name="gray")
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

  padding: 8px;
  text-align: left;

  border-top: $gray-border;

  &:last-child {
    border-bottom: $gray-border;
  }

  cursor: pointer;

}

.gray {
  color: $gray;
  font-size: small;
}

</style>
