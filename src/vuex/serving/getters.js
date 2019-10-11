import * as servicePoints from '@/services/servicePoints';

export const SERVICE_POINTS = 'ServicePoints';
export const CURRENT_SERVICE_POINT = 'currentServicePoint';
export const CURRENT_SERVING_MASTER = 'currentServingMaster';
export const SERVING_MASTERS = 'ServingMasters';
export const BUSY = 'busy';
export const ERROR = 'error';

export default {

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
