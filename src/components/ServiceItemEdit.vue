<template lang="pug">

el-drawer.service-item-edit(
  :title="title"
  :visible="drawerOpen"
  :before-close="handleClose"
  direction="rtl"
  :wrapper-closable="false"
  size="100%"
  :append-to-body="true"
  ref="drawer"
)

  .service-point
    span {{ servicePoint.address }}
    small(v-if="servicePoint.name") ({{ servicePoint.name }})

  .customer
    span {{ customerName }}

  service-item-form(:model="model" :defaults="modelDefaults")

  form-buttons(
    :loading="loading"
    :changed="changed"
    @cancelClick="cancelClick"
    @saveClick="saveClick"
    :deletable="false"
  )

</template>
<script>

import get from 'lodash/get';
import ServiceItem from '@/models-vuex/ServiceItem';
import ServicePoint from '@/models-vuex/ServicePoint';
import FormButtons from '@/lib/FormButtons.vue';
import DrawerEditor from '@/lib/DrawerEditor';
import ServiceItemForm from '@/components/ServiceItemForm.vue';
import { normalizeDataFields } from '@/services/serving';
import ServiceContract from '@/models-vuex/ServiceContract';

export default {
  name: 'ServiceItemEdit',
  props: {
    serviceItemId: String,
  },
  computed: {
    modelOrigin() {
      return ServiceItem.reactiveGet(this.serviceItemId);
    },
    title() {
      return 'Įrenginio redagavimas';
    },
    servicePoint() {
      return ServicePoint.reactiveGet(this.modelOrigin.servicePointId);
    },
    customer() {
      return this.serviceContract && ServiceContract.customer(this.serviceContract);
    },
    customerName() {
      return get(this.customer, 'name');
    },
    serviceContract() {
      const { servicePoint } = this;
      return servicePoint && ServiceContract.reactiveGet(servicePoint.currentServiceContractId);
    },
    modelDefaults() {
      const { filterSystemId } = this.model;
      const inherited = name => ServiceItem.inheritedSystemProp({ filterSystemId }, name);
      return {
        servicePrice: inherited('servicePrice'),
        smallServicePrice: inherited('smallServicePrice'),
        serviceFrequency: inherited('serviceFrequency'),
      };
    },
  },
  created() {
    this.$watch('serviceItemId', serviceItemId => {
      this.model = this.modelInstance(serviceItemId);
    }, { immediate: true });
  },
  methods: {
    modelInstance() {
      const record = this.modelOrigin;
      return { ...record };
    },
    saveClick() {
      const data = normalizeDataFields(this.model, [
        'servicePrice',
        'smallServicePrice',
        'serviceFrequency',
      ]);
      this.performOperation(() => ServiceItem.apiInsert(data));
    },
  },
  components: {
    FormButtons,
    ServiceItemForm,
  },
  mixins: [DrawerEditor],
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.service-point, .customer {
  margin: $margin-right;
  text-align: right;
  font-size: 85%;
}

.service-item-form {
  margin: 0 $margin-right 65px;
}

.service-item-edit ::v-deep(.el-drawer__body) {
  overflow-y: scroll;
}

</style>
