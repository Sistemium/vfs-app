<template lang="pug">
.service-item-services-info
  form-field(
    v-if="lastService"
    label="Paskutinis aptarnavimas"
    :text="lastService.date"
  )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FormField from '@/components/FormField.vue';
import type { ServiceItemService } from '@/types/Serving';

const props = defineProps<{
  services: ServiceItemService[];
}>();

const lastService = computed(() => props.services[0]);

</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
</style>
