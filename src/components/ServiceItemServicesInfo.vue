<template lang="pug">
service-item-services-list.service-item-services-info(
  :service-item-services='servicesArray'
  @click='item => emit("click", item)'
)
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ServiceItemServiceData } from '@/types/Serving';
import { SERVICE_TYPE_SERVICE } from '@/models-vuex/ServiceItem';
import ServiceItemServicesList from '@/components/ServiceItemServicesList.vue';

const props = defineProps<{
  services: ServiceItemServiceData[];
}>();

const emit = defineEmits<{
  (e: 'click', item: ServiceItemServiceData): void;
}>();

const lastService = computed(() =>
  props.services.find(({ type }) => type === SERVICE_TYPE_SERVICE)
);

const lastVisit = computed<ServiceItemServiceData | null>(() => {
  const last = props.services[0];
  return last?.id === lastService?.value?.id ? null : last;
});

const servicesArray = computed(() => {
  const res = [];
  if (lastVisit.value) {
    res.push(lastVisit.value);
  }
  if (lastService.value) {
    res.push(lastService.value);
  }
  return res;
});

// const lastVisitLabel = computed(() => {
//   const { value } = lastVisit;
//   if (!value) {
//     return null;
//   }
//   return TYPE_TITLE_MAP.get(value.type);
// });
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.date-to {
  margin-left: $padding;
}

.form-field + .form-field {
  margin-top: $padding;
}
</style>
