import * as ls from '@/services/localStorage';
import * as g from './getters';

export const SET_CURRENT_SERVING_MASTER = set(g.CURRENT_SERVING_MASTER);
export const SET_CURRENT_SERVICE_POINT = set(g.CURRENT_SERVICE_POINT);
export const SET_BUSY = set(g.BUSY);
export const SET_ERROR = set(g.ERROR);
export const SET_SEARCH_TEXT = set(g.SEARCH_TEXT);
export const SET_POINTS_SORTING = set(g.POINTS_SORTING);
export const SET_SHOW_DONE_TASKS = set(g.SHOW_DONE_TASKS);
export const SET_SERVING_MONTH = 'SET_SERVING_MONTH';

export default {

  [SET_SHOW_DONE_TASKS](state, data) {
    ls.setLocalStorageValue(g.SHOW_DONE_TASKS, data);
    state[g.SHOW_DONE_TASKS] = data;
  },

  [SET_POINTS_SORTING](state, data) {
    ls.setLocalStorageValue(g.POINTS_SORTING, data);
    state[g.POINTS_SORTING] = data;
  },

  [SET_SERVING_MONTH](state, data) {
    state[g.CURRENT_SERVING_MONTH] = data;
  },

  [SET_SEARCH_TEXT](state, text) {
    state[g.SEARCH_TEXT] = text || '';
  },

  [SET_CURRENT_SERVICE_POINT](state, servicePoint) {
    state[g.CURRENT_SERVICE_POINT] = servicePoint && servicePoint.id;
  },

  [SET_CURRENT_SERVING_MASTER](state, servingMaster) {
    state[g.CURRENT_SERVING_MASTER] = servingMaster ? (servingMaster.id || servingMaster) : null;
  },

  [SET_BUSY](state, busyMessage) {
    state[g.BUSY] = busyMessage;
  },

  [SET_ERROR](state, error) {
    state[g.ERROR] = error;
    state[g.BUSY] = false;
  },

};

function set(name) {
  return `SET_${name}`;
}
