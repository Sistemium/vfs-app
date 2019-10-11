export const IS_AUTHORIZED = 'IS_AUTHORIZED';
export const IS_AUTHORIZING = 'IS_AUTHORIZING';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const ACCOUNT = 'account';

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

};
