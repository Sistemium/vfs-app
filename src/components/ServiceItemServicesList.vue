<template lang="pug">

.service-item-services-list
  .service-item-service.list-item(
    v-for="service in services" :key:="service.id"
    @click="$emit('click', service)"
  )
    i.type(:class="[service.typeIcon, service.type]")
    .date(v-text="service.date")
    .info(v-text="service.info")

</template>
<script>

import orderBy from 'lodash/orderBy';

const NAME = 'ServiceItemServicesList';

export default {
  name: NAME,
  props: {
    serviceItemServices: Array,
  },
  computed: {
    services() {
      return orderBy(this.serviceItemServices, ['date'], ['desc']);
    },
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.service-item-service {

  display: flex;
  line-height: 20px;
  //align-items: center;
  padding: 8px 0;
  border-bottom: $gray-border;

  > * + * {
    margin-left: $margin-right;
  }

  .type {
    color: $blue;

    &.service {
      color: $green;
    }

    &.install, &.pause {
      color: $dark-gray;
    }

  }

  .info {
    flex: 1;
    font-size: 75%;
  }

  &:first-child {
    border-top: $gray-border;
  }

}

.service-item-services-list {
  width: 100%;
  //flex-direction: column;
  //align-items: flex-start;
}

</style>
