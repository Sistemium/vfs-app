<template lang="pug">

.agreement-state-edit
  el-radio-group(v-model="buttonState" size="small")
    el-radio-button(:label="states.no") {{ labels.no }}
    el-radio-button(:label="states.forbid") {{ labels.forbid }}
    el-radio-button(:label="states.unlimited") {{ labels.unlimited }}
    el-radio-button(:label="states.limited") {{ labels.limited }}

</template>
<script>

import * as svc from '@/services/customers';

export default {
  name: 'AgreementStateEdit',
  props: {
    value: Object,
  },
  data() {
    const { expiryDate = null } = this.value || {};
    return {
      buttonState: svc.modelToState(this.value),
      states: svc.STATES,
      labels: svc.LABELS,
      expiryDate,
    };
  },
  methods: {},
  watch: {
    value(model) {
      this.buttonState = svc.modelToState(model);
    },
    buttonState(newState) {
      this.$emit('input', svc.stateToModel(newState, this.expiryDate));
    },
  },
};


</script>
<style scoped lang="scss">

@import "../styles/variables";

</style>
