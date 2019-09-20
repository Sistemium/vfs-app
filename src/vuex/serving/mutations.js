import map from 'lodash/map';
import * as g from './getters';

export const SET_SERVICE_POINTS = set(g.SERVICE_POINTS);

export default {

  [SET_SERVICE_POINTS](state, data) {
    state[g.SERVICE_POINTS] = map(data, 'id');
  },

};

function set(name) {
  return `SET_${name}`;
}
