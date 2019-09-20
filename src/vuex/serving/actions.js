import { loadServicePoints } from '@/services/servicePoints';
import * as m from './mutations';

export const LOAD_SERVICE_POINTS = 'LOAD_SERVICE_POINTS';

export default {

  async [LOAD_SERVICE_POINTS]({ commit }) {
    const data = await loadServicePoints();
    commit(m.SET_SERVICE_POINTS, data);
  },


};
