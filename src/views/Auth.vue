<template lang="pug">

.auth-page

  h1 Authorization

  .oauth-buttons
    oauth-button(label="Google" image="icons8-google_plus")
    oauth-button(label="Facebook" image="icons8-facebook")
    oauth-button(
      label="Mobile phone SMS"
      image="icons8-cell_phone"
      button-type="danger"
      code="sms"
    )


</template>
<script>

import { createNamespacedHelpers } from 'vuex';
import OauthButton from '@/components/OauthButton.vue';
import * as actions from '@/vuex/auth/actions';
import log from 'sistemium-telegram/services/log';

const { debug } = log('auth');

const { mapActions } = createNamespacedHelpers('auth');

export default {
  name: 'Auth',
  components: { OauthButton },
  computed: {
    accessToken() {
      return this.$route.query['access-token'];
    },
  },
  methods: {
    ...mapActions({
      login: actions.AUTH_INIT,
    }),
    // ...mapGetters({
    //   campaigns: getters.CAMPAIGNS,
  },
  async created() {
    if (!this.accessToken) {
      return;
    }
    const isLogged = await this.login(this.accessToken);
    debug(isLogged);
    if (isLogged) {
      const { location } = window;
      const url = `${location.protocol}//${location.host}${location.pathname}/#/`;
      window.history.pushState({}, document.title, url);
    }
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.oauth-buttons {
  margin: $margin-right auto;

  .oauth-button {
    margin: $margin-right 0;
  }

  /*display: flex;*/
  /*flex-direction: column;*/
  max-width: 250px;
  /*justify-content: center;*/
}

</style>
