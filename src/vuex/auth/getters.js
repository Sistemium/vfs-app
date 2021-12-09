export const IS_AUTHORIZED = 'IS_AUTHORIZED';
export const IS_AUTHORIZING = 'IS_AUTHORIZING';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const ACCOUNT = 'account';
export const ROLES = 'roles';
export const HAS_ROLE = 'HAS_ROLE';
export const SAVED_ACCOUNTS = 'savedAccounts';

export default {

  [IS_AUTHORIZED](state, getters) {
    return !!getters[ACCESS_TOKEN];
  },

  [IS_AUTHORIZING](state) {
    return state[IS_AUTHORIZING];
  },

  [ACCESS_TOKEN](state) {
    return state[ACCESS_TOKEN];
  },

  [ACCOUNT](state) {
    return state[ACCOUNT];
  },

  [ROLES](state) {
    return state[ROLES];
  },

  [HAS_ROLE](state) {
    return role => !!(state.roles && state.roles[role]) || false;
  },

  [SAVED_ACCOUNTS](state) {
    return state[SAVED_ACCOUNTS] || [];
  },

};
