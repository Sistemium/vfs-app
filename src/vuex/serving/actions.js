import debounce from 'lodash/debounce';
import * as ls from '@/services/localStorage';
import * as svc from '@/services/serving';
import * as m from './mutations';
import * as g from '@/vuex/serving/getters';

export const LOAD_SERVICE_POINTS = 'LOAD_SERVICE_POINTS';
export const LOAD_SERVING_MASTERS = 'LOAD_SERVING_MASTERS';
export const LOAD_SERVICE_ITEM_SERVICE = 'LOAD_SERVICE_ITEM_SERVICE';
export const SET_CURRENT_SERVICE_POINT = 'SET_CURRENT_SERVICE_POINT';
export const SET_CURRENT_SERVING_MASTER = 'SET_CURRENT_SERVING_MASTER';
export const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';
export const SET_SERVING_MONTH = 'SET_SERVING_MONTH';
// const THROW_ERROR = 'error';

export default {

  [SET_SERVING_MONTH]({ commit }, month) {
    commit(SET_SERVING_MONTH, month);
  },

  [SEARCH_TEXT_CHANGE]: debounce(({ commit }, searchText) => {
    commit(m.SET_SEARCH_TEXT, searchText);
  }, 750),

  [LOAD_SERVING_MASTERS]: asyncAction(async ({ commit }) => {
    await svc.loadServingMasters();
    const servingMaster = ls.getLocalStorageItem(g.CURRENT_SERVING_MASTER);
    if (servingMaster) {
      commit(m.SET_CURRENT_SERVING_MASTER, servingMaster);
    }
  }),

  [LOAD_SERVICE_ITEM_SERVICE]: asyncAction(async (etc, servicePointId) => {
    await svc.loadServiceItemService(servicePointId);
  }),

  [LOAD_SERVICE_POINTS]: asyncAction(async ({ commit }, servingMasterId) => {
    const onProgress = msg => commit(m.SET_BUSY, msg);
    await svc.loadServicePoints(servingMasterId, onProgress);
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
