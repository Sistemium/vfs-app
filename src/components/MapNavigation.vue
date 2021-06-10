<template lang="pug">

el-dropdown.map-navigation(
  split-button @command="handleCommand" @click="handleNavigation"
  trigger="click"
)
  img(:alt="selectedNavigator" :src="navigatorIcon")
  el-dropdown-menu(slot='dropdown')
    el-dropdown-item(command="Google")
      img(alt="Google Maps" src="../assets/google-maps-256.png")
      span.maps-name Google Maps
    el-dropdown-item(command="Waze")
      img(alt="Waze" src="../assets/waze-256.png")
      span.maps-name Waze

</template>
<script>

import { isNative, requestFromDevice } from 'sistemium-vue/services/native';
import * as ls from '@/services/localStorage';
import wazeIcon from '@/assets/waze-256.png';
import googleIcon from '@/assets/google-maps-256.png';
import ServicePoint from '@/models-vuex/ServicePoint';

const NAME = 'MapNavigation';

export default {
  props: {
    model: Object,
  },
  data() {
    return {
      selectedNavigator: 'Google',
    };
  },
  methods: {
    handleCommand(command = 'Google') {
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
          window.open(`https://www.waze.com/ul?ll=${this.coords.lat}%2C${this.coords.lng}&navigate=yes&zoom=17`);
          return;
        default:
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${this.coords.lat}%2C${this.coords.lng}`);
      }
    },
  },
  computed: {
    navigatorIcon() {
      switch (this.selectedNavigator) {
        case 'Waze':
          return wazeIcon;
        default:
          return googleIcon;
      }
    },
    coords() {
      return ServicePoint.coords(this.model);
    },
  },
  created() {
    this.selectedNavigator = ls.getLocalStorageItem('selectedNavigator') || 'Google';
  },
  name: NAME,
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.map-navigation {

  display: block;
  text-align: right;

  img {
    max-height: 30px;
  }

  ::v-deep {

    .el-button-group {
      display: flex;
    }

    .el-button {
      padding: $padding / 2;
    }
  }

}

.el-dropdown-menu__item {
  display: flex;
  align-items: center;

  img {
    max-height: 20px;
  }
}

</style>
