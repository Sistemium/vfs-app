import { mapId, orderByAddress, orderByName } from '@/lib/fp';
import * as g from './getters';

export const SET_SERVICE_POINTS = set(g.SERVICE_POINTS);
export const SET_SERVING_MASTERS = set(g.SERVING_MASTERS);
export const SET_CURRENT_SERVING_MASTER = set(g.CURRENT_SERVING_MASTER);
export const SET_CURRENT_SERVICE_POINT = set(g.CURRENT_SERVICE_POINT);
export const SET_BUSY = set(g.BUSY);
export const SET_ERROR = set(g.ERROR);
export const SET_SEARCH_TEXT = set(g.SEARCH_TEXT);
export const SET_SERVING_MONTH = 'SET_SERVING_MONTH';

export default {

  [SET_SERVING_MONTH](state, data) {
    state[g.CURRENT_SERVING_MONTH] = data;
  },

  [SET_SEARCH_TEXT](state, text) {
    state[g.SEARCH_TEXT] = text || '';
  },

  [SET_SERVING_MASTERS](state, data) {
    state[g.SERVING_MASTERS] = mapId(orderByName(data));
  },

  [SET_SERVICE_POINTS](state, data) {
    state[g.SERVICE_POINTS] = mapId(orderByAddress(data));
  },

  [SET_CURRENT_SERVICE_POINT](state, servicePoint) {
    state[g.CURRENT_SERVICE_POINT] = servicePoint && servicePoint.id;
  },

  [SET_CURRENT_SERVING_MASTER](state, servingMaster) {
    state[g.CURRENT_SERVING_MASTER] = servingMaster ? (servingMaster.id || servingMaster) : null;
  },

  [SET_BUSY](state, busy) {
    state[g.BUSY] = !!busy;
  },

  [SET_ERROR](state, error) {
    state[g.ERROR] = error;
    state[g.BUSY] = false;
  },

};

function set(name) {
  return `SET_${name}`;
}
