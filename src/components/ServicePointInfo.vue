<template lang="pug">

.service-point-info(v-if="servicePoint")

  .address.field
    i.el-icon-location-information
    span {{ servicePoint.address }}
    small(v-if="servicePoint.name") ({{ servicePoint.name }})

  template(v-if="serviceContract")

    .customer.field
      i.el-icon-s-custom
      span.name(v-text="customerName")

    .contacts
      contact-info(v-for="contact in contacts" :key="contacts.id" :contact="contact")

    .contract.field
      i.el-icon-s-management
      span № {{ serviceContract.num || 'BN' }} nuo {{ serviceContract.date }}

</template>
<script>

import ContactInfo from '@/components/ContactInfo.vue';

const NAME = 'ServicePointInfo';

export default {
  props: {
    servicePoint: Object,
  },
  computed: {
    customerName() {
      const { serviceContract } = this;
      return serviceContract.customer.name;
    },
    contacts() {
      return this.serviceContract.customer.contacts();
    },
    serviceContract() {
      return this.servicePoint && this.servicePoint.serviceContract;
    },
  },
  components: { ContactInfo },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/forms";

.service-point-info {
  @extend %form;
}

.contact-info {
  margin-right: $margin-right;
}

</style>
