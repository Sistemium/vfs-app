import { servicePointByIds } from '@/services/servicePoints';

export const SERVICE_POINTS = 'ServicePoints';
export const CURRENT_SERVICE_POINT = 'currentServicePoint';
export const BUSY = 'busy';

export default {

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
