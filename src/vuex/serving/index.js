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
      account: null,
      roles: null,
      error: null,
      [g.SERVICE_POINTS]: [],
    };
  },

};
