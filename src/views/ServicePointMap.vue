<template lang="pug">

el-drawer.service-point-map(
  :title="title"
  :visible="drawerOpen"
  :before-close="handleClose"
  direction="rtl"
  :wrapper-closable="false"
  size="100%"
  :append-to-body="true"
  ref="drawer"
)

  .topBar

    .address {{ model.address }}

    map-navigation(:model="model")

  GmapMap(
    :center="coords"
    :zoom="16"
    :options="mapOptions"
    v-if="coords"
  )
    GmapMarker(:position="coords")

</template>
<script>

import first from 'lodash/first';
import DrawerEditor from '@/lib/DrawerEditor';
import { servicePointByIds } from '@/services/serving';
import MapNavigation from '@/components/MapNavigation.vue';
import ServicePoint from '@/models-vuex/ServicePoint';

const NAME = 'ServicePointMap';

export default {
  components: { MapNavigation },
  data() {
    return {
      mapOptions: {
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
      },
    };
  },
  props: {
    servicePointId: String,
    from: Object,
  },
  created() {
    this.$watch('$route.params.servicePointId', servicePointId => {
      this.model = first(servicePointByIds([servicePointId]));
    }, { immediate: true });
  },
  computed: {
    coords() {
      return this.model && ServicePoint.coords(this.model);
    },
    title() {
      return this.model && ServicePoint.title(this.model);
    },
  },
  mixins: [DrawerEditor],
  name: NAME,
};

</script>
<style lang="scss">

@import "../styles/variables";

.service-point-map {
  .el-drawer__body {
    display: flex;
    flex-direction: column;
    // background: $gray-background;
  }
}

</style>
<style scoped lang="scss">

@import "../styles/variables";

.vue-map-container {
  flex: 1;
  margin: $margin-right;
}

.maps-name {
  margin-left: $padding;
}

.topBar {

  display: flex;
  align-items: center;
  padding: 0 $margin-right;

  .address {
    text-align: center;
    flex: 1;
  }

}

</style>
