import { createNamespacedHelpers } from 'vuex';

import * as g from './getters';
import * as a from './actions';

const { mapActions, mapGetters } = createNamespacedHelpers('serving');

export default {

  actions: mapActions({
    setCurrentServicePoint: a.SET_CURRENT_SERVICE_POINT,
    loadServicePoints: a.LOAD_SERVICE_POINTS,
  }),

  getters: mapGetters({
    currentServicePoint: g.CURRENT_SERVICE_POINT,
    servicePoints: g.SERVICE_POINTS,
  }),

};
