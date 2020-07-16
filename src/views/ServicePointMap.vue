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
  .address {{ model.address }}

  el-dropdown.navigation(split-button @command="handleCommand" @click="handleNavigation")
    img(alt="Google Maps" :src="navigatorIcon")
    el-dropdown-menu(slot='dropdown')
      el-dropdown-item(command="Google")
        img(alt="Google Maps" src="../assets/google-maps-256.png")
        |   Google Maps
      el-dropdown-item(command="Waze")
        img(alt="Waze" src="../assets/waze-256.png")
        |   Waze

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
import googleIcon from '@/assets/google-maps-256.png';
import wazeIcon from '@/assets/waze-256.png';
import * as ls from '@/services/localStorage';
import { requestFromDevice, isNative } from 'sistemium-vue/services/native';

const NAME = 'ServicePointMap';

export default {
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
      selectedNavigator: 'google',
    };
  },
  props: {
    servicePointId: String,
    from: Object,
  },
  created() {
    this.$watch('$route.params.servicePointId', servicePointId => {
      this.model = first(servicePointByIds([servicePointId]));
      this.selectedNavigator = ls.getLocalStorageItem('selectedNavigator') || 'google';
    }, { immediate: true });
  },
  computed: {
    coords() {
      return this.model.coords();
    },
    title() {
      return this.model.title();
    },
    navigatorIcon() {
      switch (this.selectedNavigator) {
        case 'Waze':
          return wazeIcon;
        default:
          return googleIcon;
      }
    },
  },
  methods: {
    handleCommand(command = 'google') {
      this.selectedNavigator = command;
      ls.setLocalStorageItem('selectedNavigator', command);
    },
    handleNavigation() {
      if (isNative()) {
        requestFromDevice('navigate', {
          navigator: this.selectedNavigator,
          latitude: this.model.coords().lat,
          longitude: this.model.coords().lng,
        });
        return;
      }
      switch (this.selectedNavigator) {
        case 'Waze':
          window.open(`https://www.waze.com/ul?ll=${this.model.coords().lat}%2C${this.model.coords().lng}&navigate=yes&zoom=17`);
          return;
        default:
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${this.model.coords().lat}%2C${this.model.coords().lng}`);
      }
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

.address {
  text-align: center;
}

.navigation {
  text-align: right;

  img {
    max-height: 39.5px;
  }

  ::v-deep .el-button {
    padding: 0px;
  }

  ::v-deep .el-dropdown__caret-button {
    padding: 14px;
    bottom:14px
  }
}

.el-dropdown-menu__item {
  img {
    max-height: 20px;
  }
}

</style>
