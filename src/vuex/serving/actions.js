import * as ls from '@/services/localStorage';
import * as svc from '@/services/servicePoints';
import * as m from './mutations';
import * as g from '@/vuex/serving/getters';

export const LOAD_SERVICE_POINTS = 'LOAD_SERVICE_POINTS';
export const LOAD_SERVING_MASTERS = 'LOAD_SERVING_MASTERS';
export const LOAD_SERVICE_ITEM_SERVICE = 'LOAD_SERVICE_ITEM_SERVICE';
export const SET_CURRENT_SERVICE_POINT = 'SET_CURRENT_SERVICE_POINT';
export const SET_CURRENT_SERVING_MASTER = 'SET_CURRENT_SERVING_MASTER';
// const THROW_ERROR = 'error';

export default {

  [LOAD_SERVING_MASTERS]: asyncAction(async ({ commit }) => {
    const data = await svc.loadServingMasters();
    commit(m.SET_SERVING_MASTERS, data);
    const servingMaster = ls.getLocalStorageItem(g.CURRENT_SERVING_MASTER);
    if (servingMaster) {
      commit(m.SET_CURRENT_SERVING_MASTER, servingMaster);
    }
  }),

  [LOAD_SERVICE_ITEM_SERVICE]: asyncAction(async (etc, servicePointId) => {
    await svc.loadServiceItemService(servicePointId);
  }),

  [LOAD_SERVICE_POINTS]: asyncAction(async ({ commit }, servingMasterId) => {
    const data = await svc.loadServicePoints(servingMasterId);
    commit(m.SET_SERVICE_POINTS, data);
  }),

  [SET_CURRENT_SERVICE_POINT]({ commit }, servicePoint) {
    commit(m.SET_CURRENT_SERVICE_POINT, servicePoint);
  },

  [SET_CURRENT_SERVING_MASTER]({ commit }, servingMaster) {
    commit(m.SET_CURRENT_SERVING_MASTER, servingMaster);
    ls.setLocalStorageItem(g.CURRENT_SERVING_MASTER, servingMaster.id);
  },

  // [THROW_ERROR]({ commit }, error) {
  //   commit(m.SET_BUSY, false);
  //   commit(m.SET_ERROR, error);
  // },

};

/**
 * Async action handler helper
 * @param action
 * @returns {Promise}
 */

function asyncAction(action) {
  return async ({ commit }, ...args) => {
    commit(m.SET_BUSY, true);
    try {
      await action({ commit }, ...args);
    } catch (e) {
      commit(m.SET_ERROR, e);
      throw e;
    }
    commit(m.SET_BUSY, false);
  };
}
