<template lang="pug">

el-form.service-item-service-form(
  :rules="rules"
  :model="model"
  ref="form"
)

  el-form-item.type()
    el-radio-group(v-model="model.type")
      el-radio-button(label="service")
        i(:class="serviceTypeIcon('service')")
      el-radio-button(label="forward")
        i(:class="serviceTypeIcon('forward')")
      el-radio-button(label="pause")
        i(:class="serviceTypeIcon('pause')")
      el-radio-button(label="other")
        i(:class="serviceTypeIcon('other')")

  el-form-item(label="Data" prop="date")
    el-date-picker(
      v-model="model.date"
      type="date"
      :editable="false"
      :clearable="false"
      placeholder="Pick a Date"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
    )
    //el-input(v-model="model.date")

  el-form-item(label="Papildomai aptarnavo" prop="info")
    el-input(v-model="model.info" type="textarea")

  el-form-item(label="Pastaba sekančiam aptarnavimui" prop="nextServiceInfo")
    el-input(v-model="model.nextServiceInfo" type="textarea")

</template>
<script>

import { serviceTypeIcon } from '@/models/ServiceItemService';

const NAME = 'ServiceItemServiceForm';

const rules = {
  date: [
    {
      required: true,
      message: 'Pasirinkite datą',
      trigger: 'change',
    },
  ],
};

export default {
  name: NAME,
  data() {
    return {
      rules,
      // item: {},
    };
  },
  props: {
    model: Object,
  },
  methods: {
    serviceTypeIcon,
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.el-radio-group {
  display: flex;
}

.el-date-editor.el-input {
  width: 100%;
}

</style>
