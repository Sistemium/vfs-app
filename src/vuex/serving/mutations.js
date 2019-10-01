import map from 'lodash/map';
import * as g from './getters';

export const SET_SERVICE_POINTS = set(g.SERVICE_POINTS);
export const SET_CURRENT_SERVICE_POINT = set(g.CURRENT_SERVICE_POINT);

export default {

  [SET_SERVICE_POINTS](state, data) {
    state[g.SERVICE_POINTS] = map(data, 'id');
  },

  [SET_CURRENT_SERVICE_POINT](state, servicePoint) {
    state[g.CURRENT_SERVICE_POINT] = servicePoint;
  },

};

function set(name) {
  return `SET_${name}`;
}
