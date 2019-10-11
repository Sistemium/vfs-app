import { createNamespacedHelpers } from 'vuex';

import * as g from './getters';
import * as a from './actions';

const { mapGetters, mapActions } = createNamespacedHelpers('auth');

export const authGetters = mapGetters({
  account: g.ACCOUNT,
});

export const authActions = mapActions({
  init: a.AUTH_INIT,
});
