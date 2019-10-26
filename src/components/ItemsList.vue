<template lang="pug">

.items-list.cell-list

  list-item(
    v-for="item in items"
    :key="item.id"
    :gray="item[grayProp]"
    :title="title(item)"
    @click="$emit('click', item)"
    :class="currentItemId === item.id && 'active'"
  )

</template>
<script>

import get from 'lodash/get';

export default {
  name: 'ItemsList',
  props: {
    items: Array,
    titleProp: String,
    grayProp: String,
    currentItemId: String,
  },
  methods: {
    title(item) {
      return get(item, this.titleProp);
    },
  },
};

</script>
<style lang="scss" scoped>

@import "../styles/lists";

</style>
