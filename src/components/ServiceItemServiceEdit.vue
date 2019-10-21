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

  .buttons
    confirm-button(
      size="small" type="warning"
      @confirm="cancelClick"
      text="Trinti"
      v-if="!changed"
      :disabled="loading"
    )
    el-button(
      type="default" size="small"
      @click="cancelClick"
      :disabled="loading"
    ) Atšaukti
    el-button(
      type="primary" size="small"
      @click="saveClick"
      :disabled="loading"
      v-if="changed"
    ) Saugoti

</template>
<script>

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
    cancelClick() {
      const { drawer } = this.$refs;
      drawer.closeDrawer();
    },
    saveData() {
      return ServiceItemService.safeSave(this.model, true);
    },
    async saveClick() {
      this.loading = true;
      const loading = this.$message({
        message: 'Saugomas ...',
        duration: 0,
      });
      try {
        await this.saveData();
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
  components: { ServiceItemServiceForm },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.service-item-service-form {
  margin: 0 $margin-right 65px;
}

.buttons {

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
<style>

.service-item-service-edit .el-drawer__body {
  overflow-y: scroll;
}

</style>
