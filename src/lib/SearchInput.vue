<template lang="pug">

.search-input
  el-input(
    prefix-icon="el-icon-search"
    v-model="searchText"
    :clearable="true"
    :size="size"
    placeholder="paieška"
  )
    el-button(
      slot="append"
      icon="el-icon-user"
    )


</template>
<script>

import debounce from 'lodash/debounce';

export default {

  name: 'SearchInput',

  props: {
    value: String,
    size: {
      type: String,
      default: 'mini',
    },
    debounce: {
      type: Number,
      default: 500,
    },
  },

  data() {
    return { searchText: this.value };
  },

  // methods: {
  //   onInput: debounce(function onInput(value) {
  //     this.$emit('input', value);
  //   }, 500),
  // },

  created() {
    this.$watch('searchText', debounce(value => this.$emit('input', value), this.debounce));
  },

};

</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
