<template lang="pug">

el-form.service-item-form(
  :rules="rules"
  :model="model"
  ref="form"
)

  el-form-item(label="Filtravimo sistema" prop="filterSystemId")
    el-select(
      v-model="model.filterSystemId"
      placeholder="Pasirinkite filtravimo sistemą"
      :disabled="true"
    )
      el-option(
        :label="filterSystemName" :value="model.filterSystemId"
      )

  el-form-item(label="Aptarnavimo kaina" prop="servicePrice")
    el-input(
      v-model="model.servicePrice"
      type="number"
      :placeholder="defaults.servicePrice"
    )

  el-form-item(label="Pusmetinio kaina" prop="smallServicePrice")
    el-input(
      v-model="model.smallServicePrice"
      type="number"
      :placeholder="defaults.smallServicePrice"
    )

  el-form-item(label="Aptarnavimo dažnumas (mėnesiai)" prop="serviceFrequency")
    el-input(
      v-model="model.serviceFrequency"
      type="number"
      :placeholder="defaults.serviceFrequency"
    )

  el-form-item(label="Kitam aptarnavimui" prop="serviceInfo")
    el-input(v-model="model.serviceInfo" type="textarea")

  el-form-item(label="Pastaba aptarnavimui" prop="additionalServiceInfo")
    el-input(v-model="model.additionalServiceInfo" type="textarea")

</template>
<script>

import get from 'lodash/get';
import FilterSystem from '@/models-vuex/FilterSystem';

export default {
  name: 'ServiceItemForm',
  data() {
    return {
      rules: {},
    };
  },
  props: {
    model: Object,
    defaults: Object,
  },
  computed: {
    filterSystemName() {
      return this.model && get(FilterSystem.reactiveGet(this.model.filterSystemId), 'name');
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.el-select {
  width: 100%;
}

</style>
