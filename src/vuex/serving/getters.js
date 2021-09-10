import orderBy from 'lodash/orderBy';
import * as servicePoints from '@/services/serving';

export const SERVICE_POINTS = 'ServicePoints';
export const MATCHING_SERVICE_POINTS = 'MatchingServicePoints';
export const MATCHING_SERVICE_TASKS = 'MATCHING_SERVICE_TASKS';
export const CURRENT_SERVICE_POINT = 'currentServicePoint';
export const CURRENT_SERVING_MASTER = 'currentServingMaster';
export const CURRENT_SERVING_MONTH = 'currentServingMonth';
export const SERVING_MASTERS = 'ServingMasters';
export const SEARCH_TEXT = 'searchText';
export const BUSY = 'busy';
export const ERROR = 'error';
export const POINTS_SORTING = 'pointsSorting';
export const SHOW_DONE_TASKS = 'showDoneTasks';

export default {

  [SHOW_DONE_TASKS](state) {
    return state[SHOW_DONE_TASKS];
  },

  [POINTS_SORTING](state) {
    return state[POINTS_SORTING];
  },

  [CURRENT_SERVING_MONTH](state) {
    return state[CURRENT_SERVING_MONTH];
  },

  [MATCHING_SERVICE_POINTS](state, getters) {
    return servicePoints.searchServicePoints(getters[SERVICE_POINTS], getters[SEARCH_TEXT]);
  },

  [MATCHING_SERVICE_TASKS](state, getters) {
    const month = getters[CURRENT_SERVING_MONTH];
    const dateB = `${month}-01`;
    const dateE = `${month}-31`;
    const showDone = getters[SHOW_DONE_TASKS];
    const data = servicePoints.servicePointsTasks(getters[SERVICE_POINTS], dateB, dateE);
    const filtered = showDone ? data : data.filter(({ isServed }) => !isServed);
    return servicePoints.searchServicePoints(filtered, getters[SEARCH_TEXT]);
  },

  [SEARCH_TEXT](state) {
    return state[SEARCH_TEXT];
  },

  [SERVING_MASTERS]() {
    return servicePoints.allServingMasters();
  },

  [SERVICE_POINTS](state, getters) {
    const masterId = state[CURRENT_SERVING_MASTER];
    const sorting = getters[POINTS_SORTING];
    const { fn = a => a } = servicePoints.POINTS_SORTING_OPTIONS.get(sorting) || {};
    const points = servicePoints.servicePointsByServingMasterId(masterId);
    return orderBy(points, fn);
  },

  [CURRENT_SERVICE_POINT](state) {
    return state[CURRENT_SERVICE_POINT];
  },

  [CURRENT_SERVING_MASTER](state) {
    return servicePoints.servingMasterById(state[CURRENT_SERVING_MASTER]);
  },

  [BUSY](state) {
    return state[BUSY];
  },

};
