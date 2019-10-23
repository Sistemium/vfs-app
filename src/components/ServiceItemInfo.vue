<template lang="pug">

.service-item-info(v-if="serviceItem")
  //.filter-system
    i.el-icon-s-flag
    span(v-text="serviceItem.filterSystem.name")
    small(v-text="serviceItem.info")

  form-field(label="Kitas aptarnavimas" :text="serviceItem.plannedServiceDate")
  //form-field(label="Sumontuota" :text="serviceItem.installingDate")
  //form-field(label="Aptarnauta" :text="serviceItem.lastServiceDate")
  form-field(label="Garantija iki" :text="serviceItem.guaranteeEnd" empty-text="Nera garatijos")
  form-field.small(label="Pastaba" :text="serviceItem.additionalServiceInfo")
  form-field.small(label="Kitam aptarnavimui" :text="serviceItem.serviceInfo")

  template(v-if="serviceItem.services.length")
    .services-header
      mt-button.add-service(size="small" type="primary" @click="addServiceClick")
        i.el-icon-circle-plus-outline
      h4 Aptarnavimo istorija
    .services
      service-item-services-list(
        :service-item-services="services()"
        @click="onItemServiceClick"
      )

  router-view

</template>
<script>

import orderBy from 'lodash/orderBy';
import ServiceItemServicesList from '@/components/ServiceItemServicesList.vue';
import log from 'sistemium-telegram/services/log';
import FormField from '@/components/FormField.vue';

const NAME = 'ServiceItemInfo';
const { debug } = log(NAME);

export default {
  props: {
    serviceItem: Object,
  },
  methods: {
    services() {
      const { installingDate, services } = this.serviceItem;
      const res = [...services];
      if (installingDate) {
        res.push({
          type: 'install',
          date: installingDate,
          info: 'Sumontuota',
          typeIcon: () => 'el-icon-s-flag',
        });
      }
      return orderBy(res, ['date'], ['desc']);
    },
    onItemServiceClick({ id: serviceItemServiceId }) {
      debug(serviceItemServiceId);
      if (!serviceItemServiceId) {
        return;
      }
      this.$router.push({
        name: 'ServiceItemServiceEdit',
        params: { serviceItemServiceId },
      });
    },
    addServiceClick() {
      this.$router.push({
        name: 'ServiceItemServiceCreate',
        params: { serviceItemId: this.serviceItem.id },
      });
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
