import { servicePointByIds } from '@/services/servicePoints';

export const SERVICE_POINTS = 'ServicePoints';
export const CURRENT_SERVICE_POINT = 'currentServicePoint';

export default {

  [SERVICE_POINTS](state) {
    return servicePointByIds(state[SERVICE_POINTS]);
  },

  [CURRENT_SERVICE_POINT](state) {
    return state[CURRENT_SERVICE_POINT];
  },

};
