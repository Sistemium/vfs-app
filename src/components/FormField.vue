<template lang="pug">

.form-field(v-if="text || emptyText")
  .label
    label {{ text ? label : emptyText }}
    //label {{ label }}
  span.text(v-text="text")

</template>
<script>

const NAME = 'FormField';

export default {
  props: {
    label: String,
    text: String,
    emptyText: String,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.form-field {

  text-align: right;
  display: flex;
  align-items: center;

  .label {
    flex: 1;
  }
}

label {
  font-size: 75%;
  background: $gray-background;
  border-radius: $border-radius;
  padding: 1px $padding;
  margin-right: $margin-right;
  color: $blue;
}

</style>
