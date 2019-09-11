import Vue from 'vue';

import * as g from './getters';

export const SET_AUTHORIZING = set(g.IS_AUTHORIZING);
export const SET_AUTHORIZED = set('AUTHORIZED');
export const SET_NOT_AUTHORIZED = set('NOT_AUTHORIZED');

export default {

  [SET_AUTHORIZING](state, token) {
    Vue.set(state, g.IS_AUTHORIZING, token || false);
    state.error = null;
  },

  [SET_AUTHORIZED](state, { token, account, roles }) {
    notBusy(state);
    state.error = null;
    state[g.ACCESS_TOKEN] = token;
    state.account = account;
    state.roles = roles;
  },

  [SET_NOT_AUTHORIZED](state, error) {
    notBusy(state);
    state.error = error;
  },

};


function notBusy(state) {
  state[g.IS_AUTHORIZING] = false;
}

function set(name) {
  return `SET_${name}`;
}
