<template lang="pug">

.auth-page

  nav-header(title="Autorizacija")

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
import log from 'sistemium-debug';
import OauthButton from '@/components/OauthButton.vue';
import * as actions from '@/vuex/auth/actions';
import * as getters from '@/vuex/auth/getters';

const { debug } = log('auth');

const { mapActions, mapGetters } = createNamespacedHelpers('auth');

export default {
  name: 'Auth',
  components: { OauthButton },
  computed: {
    accessToken() {
      return this.$route.query['access-token'];
    },
    ...mapGetters({
      isAuthorized: getters.IS_AUTHORIZED,
    }),
  },
  methods: {
    ...mapActions({
      login: actions.AUTH_INIT,
    }),
    onAuth() {
      const to = this.$route.query.from || '/';
      // debug('isAuthorized', this.$route);
      this.$router.push(to);
    },
  },
  watch: {
    isAuthorized(yes) {
      debug('isAuthorized', yes);
      if (yes) {
        this.onAuth();
      }
    },
  },
  async created() {
    if (this.isAuthorized) {
      this.onAuth();
    }
    if (!this.accessToken) {
      return;
    }
    const isLogged = await this.login(this.accessToken);
    debug(isLogged);
  },
};

</script>
<style scoped lang="scss">

@import "../styles/variables";

.oauth-buttons {

  margin: 50px auto 0;
  max-width: 250px;

  .oauth-button {
    margin: $margin-right 0;
  }

}

</style>
