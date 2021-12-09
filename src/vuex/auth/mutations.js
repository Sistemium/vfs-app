import Vue from 'vue';
import map from 'lodash/map';

import * as ls from '../../services/localStorage';
import * as g from './getters';

export const SET_AUTHORIZING = set(g.IS_AUTHORIZING);
export const SET_AUTHORIZED = set('AUTHORIZED');
export const SET_NOT_AUTHORIZED = set('NOT_AUTHORIZED');
export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';

const LS_KEY_ACCOUNTS = 'accounts';

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

  [SAVE_ACCOUNT](state, { authorization, account }) {
    const saved = saveLoggedAccount(authorization, account);
    state[g.SAVED_ACCOUNTS] = map(saved, a => a.account);
  },

};


function saveLoggedAccount(authorization, account) {
  const saved = getSavedAccounts();
  saved[account.authId || authorization] = { account, authorization };
  ls.setLocalStorageValue(LS_KEY_ACCOUNTS, saved);
  return saved;
}

function notBusy(state) {
  state[g.IS_AUTHORIZING] = false;
}

function set(name) {
  return `SET_${name}`;
}

export function getSavedAuthorization(account) {
  const allSaved = getSavedAccounts();
  const saved = allSaved[account.authId];
  return saved && saved.authorization;
}

function getSavedAccounts() {
  return ls.getLocalStorageValue(LS_KEY_ACCOUNTS) || {};
}

export function clearSavedAccounts() {
  localStorage.removeItem(LS_KEY_ACCOUNTS);
}
