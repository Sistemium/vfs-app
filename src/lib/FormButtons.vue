<template lang="pug">

.form-buttons
  confirm-button(
    size="small" type="warning"
    @confirm="$emit('deleteClick')"
    text="Trinti"
    v-if="!changed"
    :disabled="!deletable || loading"
  )
  el-button(
    type="default" size="small"
    @click="$emit('cancelClick')"
    :disabled="loading"
  ) {{ changed ? 'Atšaukti' : 'Uždaryti' }}
  el-button(
    type="primary" size="small"
    @click="$emit('saveClick')"
    :disabled="loading"
    v-if="changed"
  ) Saugoti

</template>
<script>

const NAME = 'FormButtons';

export default {
  props: {
    loading: Boolean,
    changed: Boolean,
    deletable: {
      type: Boolean,
      default: true,
    },
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.form-buttons {

  display: flex;
  justify-content: space-around;
  text-align: center;
  position: fixed;
  bottom: 0;
  padding: $margin-top;
  left: 0;
  right: 0;
  background-color: $gray-background;

  > * + * {
    margin-left: $margin-right;
  }
}

</style>
