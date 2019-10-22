<template lang="pug">

el-drawer.service-item-service-edit(
  title="Aptarnavimas"
  :visible="drawerOpen"
  :before-close="handleClose"
  direction="rtl"
  :wrapper-closable="false"
  size="100%"
  :append-to-body="true"
  ref="drawer"
)

  service-item-service-form(:model="model" v-if="serviceItemServiceId")

  form-buttons(
    :loading="loading"
    :changed="changed"
    @deleteClick="deleteClick"
    @cancelClick="cancelClick"
    @saveClick="saveClick"
  )

</template>
<script>

import FormButtons from '@/lib/FormButtons.vue';
import DrawerEditor from '@/lib/DrawerEditor';
import ServiceItemService from '@/models/ServiceItemService';
import ServiceItemServiceForm from '@/components/ServiceItemServiceForm.vue';

const NAME = 'ServiceItemServiceEdit';

export default {
  props: {
    serviceItemServiceId: String,
  },
  created() {
    this.$watch('serviceItemServiceId', serviceItemServiceId => {
      this.model = this.modelInstance(serviceItemServiceId);
    }, { immediate: true });
  },
  methods: {
    modelInstance(serviceItemServiceId) {
      const serviceItemService = ServiceItemService.get(serviceItemServiceId);
      return ServiceItemService.mapper.createRecord(serviceItemService.toJSON());
    },
    deleteClick() {
      const { serviceItemServiceId: id } = this;
      this.performOperation(() => ServiceItemService.destroy({ id }));
    },
    saveClick() {
      this.performOperation(() => ServiceItemService.safeSave(this.model, true));
    },
  },
  name: NAME,
  components: {
    FormButtons,
    ServiceItemServiceForm,
  },
  mixins: [DrawerEditor],
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.service-item-service-form {
  margin: 0 $margin-right 65px;
}

</style>
<style>

.service-item-service-edit .el-drawer__body {
  overflow-y: scroll;
}

</style>
