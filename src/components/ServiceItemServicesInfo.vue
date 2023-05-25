<template lang="pug">
.service-item-services-info
  form-field(
    v-if='lastService'
    label='Paskutinis aptarnavimas'
    :text='lastService.date'
  )
  form-field(
    v-if='lastVisit'
    :label='lastVisitLabel'
    :text='lastVisit.date'
  )
    //i.type(:class="[lastVisit.typeIcon, lastVisit.type]")
    .date-to(v-if='lastVisit.nextServiceDate') į {{ lastVisit.nextServiceDate }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FormField from '@/components/FormField.vue';
import type { ServiceItemService } from '@/types/Serving';
import { SERVICE_TYPE_SERVICE } from '@/models-vuex/ServiceItem';
import { TYPE_TITLE_MAP } from '@/models-vuex/ServiceItemService';

const props = defineProps<{
  services: ServiceItemService[];
}>();

const lastService = computed(() =>
  props.services.find(({ type }) => type === SERVICE_TYPE_SERVICE)
);

const lastVisit = computed<ServiceItemService | null>(() => {
  const last = props.services[0];
  return last?.id === lastService?.value?.id ? null : last;
});

const lastVisitLabel = computed(() => {
  const { value } = lastVisit;
  if (!value) {
    return null;
  }
  return TYPE_TITLE_MAP.get(value.type);
});
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
