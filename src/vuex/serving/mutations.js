import fpMap from 'lodash/fp/map';
import * as g from './getters';

export const SET_SERVICE_POINTS = set(g.SERVICE_POINTS);
export const SET_SERVING_MASTERS = set(g.SERVING_MASTERS);
export const SET_CURRENT_SERVICE_POINT = set(g.CURRENT_SERVICE_POINT);
export const SET_BUSY = set(g.BUSY);
export const SET_ERROR = set(g.ERROR);

const mapId = fpMap('id');

export default {

  [SET_SERVING_MASTERS](state, data) {
    state[g.SERVING_MASTERS] = mapId(data);
  },

  [SET_SERVICE_POINTS](state, data) {
    state[g.SERVICE_POINTS] = mapId(data);
  },

  [SET_CURRENT_SERVICE_POINT](state, servicePoint) {
    state[g.CURRENT_SERVICE_POINT] = servicePoint && servicePoint.id;
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
