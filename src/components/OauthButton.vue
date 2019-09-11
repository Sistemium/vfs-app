<template lang="pug">

.oauth-button
  mt-button(:type="buttonType" @click="onClick")
    .button-content
      img(:src="src")
      span {{ label }}

</template>
<script>

import toLower from 'lodash/toLower';

const { VUE_APP_OAUTH_URL, VUE_APP_OAUTH_REDIRECT_URI, VUE_APP_OAUTH_ORG_APP } = process.env;

export default {
  name: 'OauthButton',
  props: {
    label: String,
    image: String,
    buttonType: {
      type: String,
      default: 'primary',
    },
    code: String,
  },
  computed: {
    src() {
      return `images/${this.image}.png`;
    },
    href() {
      const url = this.code || toLower(this.label);
      return `${VUE_APP_OAUTH_URL}/auth/${url}/vfs`
        + `?redirect_uri=${VUE_APP_OAUTH_REDIRECT_URI}&orgAppId=${VUE_APP_OAUTH_ORG_APP}`;
    },
  },
  methods: {
    onClick() {
      window.location.href = this.href;
    },
  },
};

</script>
<style scoped lang="scss">
@import "../styles/variables";

.button-content {
  display: flex;
  align-items: center;
}

img {
  width: 30px;
  margin-right: $margin-right;
}

.mint-button {
  display: block;
  width: 100%;
}

</style>
