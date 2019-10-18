<template lang="pug">

.service-item-service-info
  .service-item-service(v-for="service in services" :key:="service.id")
    i.type(:class="[service.typeIcon(), service.type]")
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
  /*align-items: center;*/
  padding: $padding 0;

  > * + * {
    margin-left: $margin-right;
  }

  .type {
    color: $blue;

    &.service {
      color: $green;
    }

    &.pause {
      color: $dark-gray;
    }
  }

  .info {
    flex: 1;
    font-size: 75%;
  }

  border-bottom: $gray-border;

  &:first-child {
    border-top: $gray-border;
  }

}

.service-item-service-info {
  width: 100%;
  //flex-direction: column;
  //align-items: flex-start;
}

</style>
