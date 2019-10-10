import { loadServicePoints, loadServingMasters } from '@/services/servicePoints';
import * as m from './mutations';

export const LOAD_SERVICE_POINTS = 'LOAD_SERVICE_POINTS';
export const LOAD_SERVING_MASTERS = 'LOAD_SERVING_MASTERS';
export const SET_CURRENT_SERVICE_POINT = 'SET_CURRENT_SERVICE_POINT';
// const THROW_ERROR = 'error';

export default {

  async [LOAD_SERVING_MASTERS]({ commit }) {
    // commit(m.SET_BUSY, true);
    const data = await loadServingMasters();
    commit(m.SET_SERVING_MASTERS, data);
    // commit(m.SET_BUSY, false);
  },

  async [LOAD_SERVICE_POINTS]({ commit }) {
    commit(m.SET_BUSY, true);
    try {
      const data = await loadServicePoints();
      commit(m.SET_SERVICE_POINTS, data);
    } catch (e) {
      // dispatch(THROW_ERROR, e);
      commit(m.SET_ERROR, e);
      throw e;
    }
    commit(m.SET_BUSY, false);
  },

  [SET_CURRENT_SERVICE_POINT]({ commit }, servicePoint) {
    commit(m.SET_CURRENT_SERVICE_POINT, servicePoint);
  },

  // [THROW_ERROR]({ commit }, error) {
  //   commit(m.SET_BUSY, false);
  //   commit(m.SET_ERROR, error);
  // },

};
