<template lang='pug'>

.service-item-info(v-if="serviceItem")
  //.filter-system
    i.el-icon-s-flag
    span(v-text="serviceItem.filterSystem.name")
    small(v-text="serviceItem.info")

  form-field(label="Kitas aptarnavimas" :text="nextServiceDateFn")
  //form-field(label="Sumontuota" :text="serviceItem.installingDate")
  //form-field(label="Aptarnauta" :text="serviceItem.lastServiceDate")
  form-field(label="Garantija iki" :text="guaranteeEnd" empty-text="Nera garantijos")
  form-field.small(label="Pastaba" :text="serviceItem.additionalServiceInfo")
  form-field.small(label="Kitam aptarnavimui" :text="serviceItem.serviceInfo")
  form-field.small(label="Aptarnavimo kaina" :text="servicePrice")
  form-field.small(label="Pusmetinio kaina" :text="smallServicePrice")

  template
    .services-header
      mt-button.add-service(size="small" type="primary" @click="addServiceClick")
        i.el-icon-circle-plus-outline
      h4 Aptarnavimo istorija
      mt-button.expand(
        size="small"
        @click="collapsed = !collapsed"
      )
        i(:class="collapsed ? 'el-icon-more' : 'el-icon-d-caret'")
    .services(v-if="services().length")
      service-item-services-info(
        v-if='collapsed'
        :services='services()'
        @click="onItemServiceClick"
      )
      service-item-services-list(
        v-else
        :service-item-services="services()"
        @click="onItemServiceClick"
      )
      .more(
        v-if='collapsed'
      )
        a(@click='collapsed = false')
         small rodyti daugiau ...
    .empty(v-else) Nera duomenų

  router-view

</template>
<script setup lang='ts'>

import orderBy from 'lodash/orderBy';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router/composables';
import log from 'sistemium-debug';
import ServiceItemServicesList from '@/components/ServiceItemServicesList.vue';
import ServiceItemServicesInfo from '@/components/ServiceItemServicesInfo.vue';
import FormField from '@/components/FormField.vue';
import ServiceItem from '@/models-vuex/ServiceItem';
import type { ServiceItemData } from '@/types/Serving';

const { debug } = log('ServiceItemInfo');

const props = defineProps<{
  serviceItem: ServiceItemData;
}>();

const collapsed = ref(true);
const route = useRoute();
const router = useRouter();

const guaranteeEnd = computed(() => ServiceItem.guaranteeEnd(props.serviceItem));
const nextServiceDateFn = computed(() => props.serviceItem
  && ServiceItem.nextServiceDateFn(props.serviceItem));

const servicePrice = computed(() => {
  const price = ServiceItem.inheritedSystemProp(props.serviceItem, 'servicePrice');
  return price ? `${price} €` : 'Nenustatyta';
});

const smallServicePrice = computed(() => {
  const res = ServiceItem.inheritedSystemProp(props.serviceItem, 'smallServicePrice');
  return res ? `${res} €` : null;
});

function services() {
  const { installingDate } = props.serviceItem;
  const data = ServiceItem.services(props.serviceItem);
  const res = [...data];
  if (installingDate) {
    res.push({
      type: 'install',
      date: installingDate,
      info: 'Sumontuota',
      typeIcon: 'el-icon-s-flag',
    });
  }
  return orderBy(res, ['date'], ['desc']);
}

function onItemServiceClick({ id: serviceItemServiceId }) {
  debug(serviceItemServiceId);
  if (!serviceItemServiceId) {
    return;
  }
  const thisPath = route.path;
  const path = `${thisPath}/serviceEdit/${serviceItemServiceId}`;
  router.push({ path });
}

function addServiceClick() {
  const path = `${route.path}/serviceCreate/${props.serviceItem.id}`;
  router.push({ path });
}

</script>
<style scoped lang='scss'>

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

  > button {
    width: auto;
    display: block;
    padding: 4px;
    height: auto;
  }
}

.add-service {
  i {
    font-size: 130%;
    //color: $blue;
    font-weight: bold;
  }
}

.more {
  text-align: center;
  a small {
    color: $primary-color;
  }
}

</style>
