import { isNative, getRoles } from 'sistemium-vue/services/native';
import http from 'axios';
import { authorizeAxios } from '@/lib/VFSDataModel';
import * as ls from '@/services/localStorage';
import * as m from './mutations';


const LS_KEY = 'authorization';

export const AUTH_INIT = 'AUTH_INIT';
export const LOGOFF = 'LOGOFF';
export const CLEAR_ERROR = '';


export default {

  /*
  Get account info and roles by an authorization token
   */

  async [AUTH_INIT]({ commit }, accessToken) {

    const token = isNative() ? true : accessToken || ls.getLocalStorageItem(LS_KEY);

    if (!token) {
      return false;
    }

    commit(m.SET_AUTHORIZING, token);

    authorizeAxios(token);

    try {
      const {
        account,
        roles,
      } = await (isNative() ? getRoles() : checkRoles(token));
      ls.setLocalStorageItem(LS_KEY, token);
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
