import { createNamespacedHelpers } from 'vuex';

import * as g from './getters';
import * as a from './actions';

const { mapActions, mapGetters } = createNamespacedHelpers('serving');

export const servingActions = mapActions({
  setCurrentServingMaster: a.SET_CURRENT_SERVING_MASTER,
  setCurrentServicePoint: a.SET_CURRENT_SERVICE_POINT,
  loadServicePoints: a.LOAD_SERVICE_POINTS,
  setServingMonth: a.SET_SERVING_MONTH,
});

export const servingGetters = mapGetters({
  currentServingMaster: g.CURRENT_SERVING_MASTER,
  servingMasters: g.SERVING_MASTERS,
  currentServicePoint: g.CURRENT_SERVICE_POINT,
  servicePoints: g.SERVICE_POINTS,
  busy: g.BUSY,
  matchingServicePoints: g.MATCHING_SERVICE_POINTS,
  matchingServiceTasks: g.MATCHING_SERVICE_TASKS,
  servingMonth: g.CURRENT_SERVING_MONTH,
});
