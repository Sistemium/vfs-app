import { isNative, getRoles } from 'sistemium-vue/services/native';
import { authorize as authorizeJSDataStore } from 'sistemium-telegram/jsdata/store';
import http from 'axios';
// import { roles } from 'sistemium-telegram/services/auth';
import * as m from './mutations';

const LS_KEY = 'vfsm.authorization';

export const AUTH_INIT = 'AUTH_INIT';
export const LOGOFF = 'LOGOFF';
export const CLEAR_ERROR = '';

export default {

  /*
  Get account info and roles by an authorization token
   */

  async [AUTH_INIT]({ commit }, accessToken) {

    const token = isNative() ? true : accessToken || localStorage.getItem(LS_KEY);

    if (!token) {
      return false;
    }

    commit(m.SET_AUTHORIZING, token);

    try {
      const { account, roles } = await (isNative() ? getRoles() : checkRoles(token));
      localStorage.setItem(LS_KEY, token);
      authorizeJSDataStore(token, 'vfs');
      commit(m.SET_AUTHORIZED, {
        token,
        account,
        roles,
      });
    } catch (err) {
      commit(m.SET_NOT_AUTHORIZED, err);
      return false;
    }

    return true;

  },

  /*
  Clean up
   */

  [LOGOFF]({ commit }) {
    commit(m.SET_AUTHORIZED, {});
    localStorage.removeItem(LS_KEY);
  },

  [CLEAR_ERROR]({ commit }) {
    commit(m.SET_NOT_AUTHORIZED, null);
  },

};

async function checkRoles(token) {

  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  return http.get(process.env.VUE_APP_PHA_ROLES_URL, {
    headers: { authorization: token },
  })
    .then(res => res.data);

}
