import { servicePointByIds } from '@/services/servicePoints';

export const SERVICE_POINTS = 'ServicePoints';

export default {

  [SERVICE_POINTS](state) {
    return servicePointByIds(state[SERVICE_POINTS]);
  },

};
