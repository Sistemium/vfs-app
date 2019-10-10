import { servicePointByIds, servingMastersByIds } from '@/services/servicePoints';

export const SERVICE_POINTS = 'ServicePoints';
export const CURRENT_SERVICE_POINT = 'currentServicePoint';
export const SERVING_MASTERS = 'ServingMasters';
export const BUSY = 'busy';
export const ERROR = 'error';

export default {

  [SERVING_MASTERS](state) {
    return servingMastersByIds(state[SERVING_MASTERS]);
  },

  [SERVICE_POINTS](state) {
    return servicePointByIds(state[SERVICE_POINTS]);
  },

  [CURRENT_SERVICE_POINT](state) {
    return state[CURRENT_SERVICE_POINT];
  },

  [BUSY](state) {
    return state[BUSY];
  },

};
