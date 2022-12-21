<template lang="pug">

.service-point-info(v-if="servicePoint")

  .address.field(@click="locationClick")
    i.el-icon-location-information
    span {{ servicePoint.address }}
    strong(v-if="servicePoint.name") ({{ servicePoint.name }})

  named-contacts.customer(:name="customerName" :contacts="contacts")
  agreement-state-info(:customer="customer")
  named-contacts(
    v-for="cp in contactPersons" :key="cp.id"
    :name="cp.name" :contacts="cp.contacts()"
  )

  .contract.field(v-if="serviceContract")
    i.el-icon-s-management
    span № {{ serviceContract.num || 'BN' }} nuo {{ serviceContract.date }}

</template>
<script>

import get from 'lodash/get';
import NamedContacts from '@/components/NamedContacts.vue';
import ServiceContract from '@/models-vuex/ServiceContract';
import Contact from '@/models-vuex/Contact';
import ServicePoint from '@/models-vuex/ServicePoint';
import AgreementStateInfo from '@/components/AgreementStateInfo.vue';

const NAME = 'ServicePointInfo';

export default {
  props: {
    servicePoint: Object,
  },
  methods: {
    locationClick() {
      const path = `${this.$route.path}/map`;
      this.$router.push({ path });
    },
  },
  computed: {
    customer() {
      return this.serviceContract && ServiceContract.customer(this.serviceContract);
    },
    customerName() {
      return get(this.customer, 'name');
    },
    contacts() {
      return this.customer && Contact.customerContacts(this.customer);
    },
    contactPersons() {
      return ServicePoint.contactPersons(this.servicePoint);
    },
    serviceContract() {
      const { servicePoint } = this;
      return servicePoint && ServiceContract.reactiveGet(servicePoint.currentServiceContractId);
    },
  },
  components: {
    AgreementStateInfo,
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

strong {
  font-weight: normal;
  color: $gray;
  margin-left: $padding;
}

.address.field {
  cursor: pointer;
}

</style>
