<template lang="pug">

.items-list.cell-list

  list-item(
    v-for="item in items"
    :key="item.id"
    :gray="item[grayProp]"
    :title="item[titleProp]"
    @click="$emit('click', item)"
  )

</template>
<script>

export default {
  name: 'ItemsList',
  props: {
    items: Array,
    titleProp: String,
    grayProp: String,
  },
};

</script>
