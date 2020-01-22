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

  service-item-service-form(:model="model" :serving-masters="servingMasters")

  form-buttons(
    :loading="loading"
    :changed="changed"
    @deleteClick="deleteClick"
    @cancelClick="cancelClick"
    @saveClick="saveClick"
  )

</template>
<script>

import { serverDateFormat } from 'sistemium-telegram/services/moments';
import FormButtons from '@/lib/FormButtons.vue';
import DrawerEditor from '@/lib/DrawerEditor';
import ServiceItemService from '@/models-vuex/ServiceItemService';
import ServiceItemServiceForm from '@/components/ServiceItemServiceForm.vue';
import { servingGetters } from '@/vuex/serving/maps';
import { serviceItemServiceById } from '@/services/serving';

const NAME = 'ServiceItemServiceEdit';

export default {
  props: {
    serviceItemServiceId: String,
    serviceItemId: String,
  },
  computed: {
    currentServingMaster: servingGetters.currentServingMaster,
    servingMasters: servingGetters.servingMasters,
    modelOrigin() {
      return serviceItemServiceById(this.serviceItemServiceId);
    },
  },
  created() {
    this.$watch('serviceItemServiceId', serviceItemServiceId => {
      this.model = this.modelInstance(serviceItemServiceId);
    }, { immediate: true });
  },
  methods: {
    modelInstance(serviceItemServiceId) {
      const { serviceItemId } = this;
      const record = serviceItemServiceId ? this.modelOrigin : {
        servingMasterId: this.currentServingMaster.id,
        serviceItemId,
        date: serverDateFormat(),
        type: 'service',
      };
      return new ServiceItemService(record);
    },
    deleteClick() {
      const { serviceItemServiceId: id } = this;
      this.performOperation(() => ServiceItemService.apiDelete(id));
    },
    saveClick() {
      if (this.model.type !== 'forward') {
        this.model.nextServiceDate = null;
      }
      this.performOperation(() => ServiceItemService.apiInsert(this.model));
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
