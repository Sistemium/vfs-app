<template lang="pug">

.service-point-info(v-if="servicePoint")

  .address.field
    i.el-icon-location-information
    span {{ servicePoint.address }}
    small(v-if="servicePoint.name") ({{ servicePoint.name }})

  named-contacts.customer(:name="customerName" :contacts="contacts")
  named-contacts(
    v-for="cp in contactPersons" :key="cp.id"
    :name="cp.name" :contacts="cp.contacts()"
  )

  .contract.field(v-if="serviceContract")
    i.el-icon-s-management
    span № {{ serviceContract.num || 'BN' }} nuo {{ serviceContract.date }}

</template>
<script>

import NamedContacts from '@/components/NamedContacts.vue';

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
    contactPersons() {
      return this.servicePoint.contactPersons();
    },
    serviceContract() {
      return this.servicePoint && this.servicePoint.serviceContract;
    },
  },
  components: {
    NamedContacts,
  },
  name: NAME,
};

</script>
<style lang="scss">

@import "../styles/forms";

.service-point-info {
  @extend %form;
}

small {
  font-size: 75%;
  color: $gray;
}

</style>
