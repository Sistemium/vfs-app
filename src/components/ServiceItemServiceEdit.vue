<template lang="pug">

el-drawer.service-item-service-edit(
  title="Aptarnavimas"
  :visible="drawerOpen"
  :before-close="handleClose"
  direction="rtl"
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
import ServiceItemService from '@/models/ServiceItemService';
import ServiceItemServiceForm from '@/components/ServiceItemServiceForm.vue';

const NAME = 'ServiceItemServiceEdit';

export default {
  props: {
    serviceItemServiceId: String,
    from: Object,
  },
  data() {
    return {
      loading: null,
      drawerOpen: false,
      // serviceItemService: null,
      model: null,
    };
  },
  created() {
    this.$watch('serviceItemServiceId', serviceItemServiceId => {
      this.model = this.modelInstance(serviceItemServiceId);
    }, { immediate: true });
    this.$nextTick(() => {
      this.drawerOpen = true;
    });
  },
  computed: {
    changed() {
      return this.model && this.model.hasChanges();
    },
  },
  methods: {
    modelInstance(serviceItemServiceId) {
      const serviceItemService = ServiceItemService.get(serviceItemServiceId);
      return ServiceItemService.mapper.createRecord(serviceItemService.toJSON());
    },
    handleClose() {
      // this.serviceItemService.revert();
      this.$router.push(this.from);
    },
    deleteClick() {
      const { serviceItemServiceId: id } = this;
      this.performOperation(() => ServiceItemService.destroy({ id }));
    },
    cancelClick() {
      const { drawer } = this.$refs;
      drawer.closeDrawer();
    },
    saveClick() {
      this.performOperation(() => ServiceItemService.safeSave(this.model, true));
    },
    async performOperation(op) {
      this.loading = true;
      const loading = this.$message({
        message: 'Saugomas ...',
        duration: 0,
      });
      try {
        await op();
        loading.close();
        this.cancelClick();
      } catch (e) {
        loading.close();
        this.$message.error({
          message: e.message,
          offset: 1,
          duration: 15000,
          showClose: true,
        });
      }
      this.loading = null;
    },
  },
  name: NAME,
  components: {
    FormButtons,
    ServiceItemServiceForm,
  },
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
