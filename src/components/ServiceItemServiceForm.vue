<template lang="pug">

el-form.service-item-service-form(
  :rules="rules"
  :model="model"
  ref="form"
)

  el-form-item.type()
    el-radio-group(v-model="model.type" size="small")
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
      placeholder="Spauskite kad pasirinkti"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
    )

  el-form-item(label="Perkelti į" prop="nextServiceDate" v-if="isForward")
    el-date-picker(
      v-model="model.nextServiceDate"
      type="date"
      :editable="false"
      :clearable="false"
      placeholder="Spauskite kad pasirinkti"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
    )

  el-form-item(label="Papildomai aptarnavo" prop="info")
    el-input(v-model="model.info" type="textarea")

  el-form-item(label="Pastaba sekančiam aptarnavimui" prop="nextServiceInfo")
    el-input(v-model="model.nextServiceInfo" type="textarea")

  el-form-item(label="Meistras")
    el-select(
      v-model="model.servingMasterId"
      placeholder="Pasirinkite apranavimo meistrą"
      :disabled="true"
    )
      el-option(
        v-for="master in servingMasters" :key="master.id"
        :label="master.name" :value="master.id"
      )

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
  nextServiceDate: [
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
    servingMasters: Array,
  },
  methods: {
    serviceTypeIcon,
  },
  computed: {
    isForward() {
      return this.model.type === 'forward';
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.el-radio-group {
  display: flex;
}

.el-date-editor.el-input, .el-select {
  width: 100%;
}

.type i {
  font-size: 150%;
}

</style>
<style lang="scss">
@import "../styles/variables";

.service-item-service-form .el-radio-button__inner {
  padding: $padding;
}

</style>
