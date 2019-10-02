import { loadServicePoints } from '@/services/servicePoints';
import * as m from './mutations';

export const LOAD_SERVICE_POINTS = 'LOAD_SERVICE_POINTS';
export const SET_CURRENT_SERVICE_POINT = 'SET_CURRENT_SERVICE_POINT';

export default {

  async [LOAD_SERVICE_POINTS]({ commit }) {
    commit(m.SET_BUSY, true);
    const data = await loadServicePoints();
    commit(m.SET_SERVICE_POINTS, data);
    commit(m.SET_BUSY, false);
  },

  [SET_CURRENT_SERVICE_POINT]({ commit }, servicePoint) {
    commit(m.SET_CURRENT_SERVICE_POINT, servicePoint);
  },

};
