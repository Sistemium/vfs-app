import { createNamespacedHelpers } from 'vuex';

import * as g from './getters';
import * as a from './actions';
import * as m from './mutations';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('serving');

export const servingMutations = mapMutations({
  setPointsSorting: m.SET_POINTS_SORTING,
  setShowDoneTasks: m.SET_SHOW_DONE_TASKS,
});

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
  matchingServed: g.MATCHING_SERVED,
  servingMonth: g.CURRENT_SERVING_MONTH,
  pointsSorting: g.POINTS_SORTING,
  showDoneTasks: g.SHOW_DONE_TASKS,
});
