import getters, * as g from './getters';
import actions from './actions';
import mutations from './mutations';

export default {

  namespaced: true,
  actions,
  mutations,
  getters,

  state() {
    return {
      [g.SERVICE_POINTS]: [],
      [g.SERVING_MASTERS]: [],
      [g.CURRENT_SERVICE_POINT]: null,
      [g.BUSY]: false,
      [g.ERROR]: null,
    };
  },

};
