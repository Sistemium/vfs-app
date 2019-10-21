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

  service-item-service-form(:model="serviceItemService" v-if="serviceItemService")

  .buttons
    el-button(type="danger" size="small" @click="cancelClick") Trinti
    el-button(type="primary" size="small" @click="cancelClick") Saugoti
    el-button(type="warning" size="small" @click="cancelClick") Atšaukti

</template>
<script>

import ServiceItemService from '@/models/ServiceItemService';
import ServiceItemServiceForm from '@/components/ServiceItemServiceForm.vue';

const NAME = 'ServiceItemServiceEdit';

export default {
  props: {
    serviceItemServiceId: String,
    from: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      drawerOpen: false,
      // from: null,
      serviceItemService: null,
    };
  },
  created() {
    this.$watch('serviceItemServiceId', serviceItemServiceId => {
      ServiceItemService.bindOne(this, serviceItemServiceId, 'serviceItemService');
    }, { immediate: true });
    this.$nextTick(() => {
      this.drawerOpen = true;
    });
  },
  methods: {
    handleClose() {
      this.serviceItemService.revert();
      this.$router.push(this.from);
    },
    cancelClick() {
      const { drawer } = this.$refs;
      drawer.closeDrawer();
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
  text-align: center;
  position: fixed;
  bottom: 0;
  margin: $margin-top auto;
  left: 0;
  right: 0;
}


</style>
<style>

.service-item-service-edit .el-drawer__body {
  overflow-y: scroll;
}

</style>
