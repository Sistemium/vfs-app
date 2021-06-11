<template lang="pug">

.agreement-state-info
  label Duomenų sutikimo būsena:
  el-tag(size="mini" :type="type") {{ label }}

</template>
<script>

import { LABELS, modelToState, STATES } from '@/services/customers';

export default {
  name: 'AgreementStateInfo',
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    state() {
      return modelToState(this.customer.notificationAgreement);
    },
    label() {
      return LABELS[this.state];
    },
    type() {
      switch (this.state) {
        case STATES.forbid:
          return 'danger';
        case STATES.no:
          return '';
        default:
          return 'success';
      }
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

label {
  margin-right: $padding;
}

</style>
