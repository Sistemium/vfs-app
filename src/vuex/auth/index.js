import getters, * as g from './getters';
import actions from './actions';
import mutations, * as m from './mutations';

export default {

  namespaced: true,
  actions,
  mutations,
  getters,

  state() {
    return {
      id: undefined,
      busy: false,
      [g.ROLES]: null,
      error: null,
      [g.ACCOUNT]: null,
      [g.IS_AUTHORIZING]: false,
      [g.ACCESS_TOKEN]: null,
      [m.PHA_AUTH_TOKEN]: {},
      savedAccounts: [],
    };
  },

};
