<template lang="pug">

.service-item-info(v-if="serviceItem")
  //.filter-system
    i.el-icon-s-flag
    span(v-text="serviceItem.filterSystem.name")
    small(v-text="serviceItem.info")

  form-field(label="Kitas aptarnavimas" :text="nextServiceDateFn")
  //form-field(label="Sumontuota" :text="serviceItem.installingDate")
  //form-field(label="Aptarnauta" :text="serviceItem.lastServiceDate")
  form-field(label="Garantija iki" :text="serviceItem.guaranteeEnd" empty-text="Nera garantijos")
  form-field.small(label="Pastaba" :text="serviceItem.additionalServiceInfo")
  form-field.small(label="Kitam aptarnavimui" :text="serviceItem.serviceInfo")
  form-field.small(label="Aptarnavimo kaina" :text="servicePrice")
  form-field.small(label="Pusmetinio kaina" :text="smallServicePrice")

  template
    .services-header
      mt-button.add-service(size="small" type="primary" @click="addServiceClick")
        i.el-icon-circle-plus-outline
      h4 Aptarnavimo istorija
    .services(v-if="services().length")
      service-item-services-list(
        :service-item-services="services()"
        @click="onItemServiceClick"
      )
    .empty(v-else) Nera duomenų

  router-view

</template>
<script>

import orderBy from 'lodash/orderBy';
import log from 'sistemium-debug';
import ServiceItemServicesList from '@/components/ServiceItemServicesList.vue';
import FormField from '@/components/FormField.vue';
import ServiceItem from '@/models-vuex/ServiceItem';

const NAME = 'ServiceItemInfo';
const { debug } = log(NAME);

export default {
  props: {
    serviceItem: Object,
  },
  computed: {
    nextServiceDateFn() {
      return this.serviceItem && ServiceItem.nextServiceDateFn(this.serviceItem);
    },
    servicePrice() {
      const price = ServiceItem.inheritedSystemProp(this.serviceItem, 'servicePrice');
      return price ? `${price} €` : 'Nenustatyta';
    },
    smallServicePrice() {
      const res = ServiceItem.inheritedSystemProp(this.serviceItem, 'smallServicePrice');
      return res ? `${res} €` : null;
    },
  },
  methods: {
    services() {
      const { installingDate } = this.serviceItem;
      const services = ServiceItem.services(this.serviceItem);
      const res = [...services];
      if (installingDate) {
        res.push({
          type: 'install',
          date: installingDate,
          info: 'Sumontuota',
          typeIcon: 'el-icon-s-flag',
        });
      }
      return orderBy(res, ['date'], ['desc']);
    },
    onItemServiceClick({ id: serviceItemServiceId }) {
      debug(serviceItemServiceId);
      if (!serviceItemServiceId) {
        return;
      }
      const thisPath = this.$route.path;
      const path = `${thisPath}/serviceEdit/${serviceItemServiceId}`;
      this.$router.push({ path });
    },
    addServiceClick() {
      const path = `${this.$route.path}/serviceCreate/${this.serviceItem.id}`;
      this.$router.push({ path });
    },
  },
  components: {
    FormField,
    ServiceItemServicesList,
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/forms";

.service-item-info {

  @extend %form;

  h4 {
    color: $gray;
    display: block;
    text-align: center;
    margin: 0 auto;
    /*font-weight: normal;*/
  }

}

.filter-system > small {
  margin-left: $margin-right;
}

small {
  color: $gray;
}

.services-header {
  display: flex;
  align-items: center;
  padding-right: 27px;
}

.add-service {
  width: auto;
  display: block;
  padding: 4px;
  height: auto;

  i {
    font-size: 130%;
    //color: $blue;
    font-weight: bold;
  }
}

</style>
