import * as servicePoints from '@/services/servicePoints';

export const SERVICE_POINTS = 'ServicePoints';
export const MATCHING_SERVICE_POINTS = 'MatchingServicePoints';
export const MATCHING_SERVICE_TASKS = 'MATCHING_SERVICE_TASKS';
export const CURRENT_SERVICE_POINT = 'currentServicePoint';
export const CURRENT_SERVING_MASTER = 'currentServingMaster';
export const SERVING_MASTERS = 'ServingMasters';
export const SEARCH_TEXT = 'searchText';
export const BUSY = 'busy';
export const ERROR = 'error';

export default {

  [MATCHING_SERVICE_POINTS](state, getters) {
    return servicePoints.searchServicePoints(getters[SERVICE_POINTS], getters[SEARCH_TEXT]);
  },

  [MATCHING_SERVICE_TASKS](state, getters) {
    const dateB = '2019-10-01';
    const dateE = '2019-10-30';
    const data = servicePoints.servicePointsTasks(getters[SERVICE_POINTS], dateB, dateE);
    return servicePoints.searchServicePoints(data, getters[SEARCH_TEXT]);
  },

  [SEARCH_TEXT](state) {
    return state[SEARCH_TEXT];
  },

  [SERVING_MASTERS](state) {
    return servicePoints.servingMastersByIds(state[SERVING_MASTERS]);
  },

  [SERVICE_POINTS](state) {
    return servicePoints.servicePointByIds(state[SERVICE_POINTS]);
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
