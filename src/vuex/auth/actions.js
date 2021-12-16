import { isNative, getRoles } from '@bit/sistemium.vue.services.native';
import http from 'axios';
import * as ls from '../../services/localStorage';
import * as m from './mutations';


const LS_KEY = 'authorization';

export const AUTH_INIT = 'AUTH_INIT';
export const LOGOFF = 'LOGOFF';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const LOG_ACCOUNT = 'LOG_ACCOUNT';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_CONFIRM = 'AUTH_REQUEST_CONFIRM';

export default {

  /*
  Get account info and roles by an authorization token
   */

  async [AUTH_INIT]({ commit }, accessToken) {

    const token = isNative() ? true : (
      accessToken
      || ls.getSessionStorageItem(LS_KEY)
      || ls.getLocalStorageItem(LS_KEY)
    );

    if (!token) {
      return false;
    }

    commit(m.SET_AUTHORIZING, token);

    try {

      const {
        id: gotToken,
        account,
        roles,
      } = await (isNative() ? getRoles() : checkRoles(token));

      ls.setLocalStorageItem(LS_KEY, gotToken);
      ls.setSessionStorageItem(LS_KEY, gotToken);

      commit(m.SET_AUTHORIZED, {
        token: gotToken,
        account,
        roles,
      });

      commit(m.SAVE_ACCOUNT, {
        authorization: gotToken,
        account,
      });

    } catch (err) {
      commit(m.SET_NOT_AUTHORIZED, err);
      return false;
    }

    return true;

  },

  /*
  Request phone authorization code
   */

  [AUTH_REQUEST]({ commit }, {
    value,
    input: phone
  }) {

    commit(m.PHA_AUTH_TOKEN, {});
    commit(m.SET_AUTHORIZING, phone);

    const res = login(`8${value}`)
      .then(id => commit(m.PHA_AUTH_TOKEN, {
        id,
        phone
      }));

    res.catch(() => commit(m.SET_NOT_AUTHORIZED, 'Неизвестный номер'));

    return res;

  },

  /*
  Confirm phone authorization code
   */

  [AUTH_REQUEST_CONFIRM]({
                           state,
                           dispatch,
                           commit
                         }, { value: code }) {

    commit(m.SET_AUTHORIZING, code);

    const res = confirm(code, state[m.PHA_AUTH_TOKEN].id)
      .then(({ accessToken }) => dispatch(AUTH_INIT, accessToken));

    res.catch(() => commit(m.SET_NOT_AUTHORIZED, 'Неправильный пароль'));

    return res;

  },

  async [LOG_ACCOUNT]({ dispatch }, account) {

    if (!account) {
      throw new Error('Account to log in must be not empty');
    }

    const token = m.getSavedAuthorization(account);

    if (!token) {
      throw new Error('No saved account info');
    }

    await dispatch(AUTH_INIT, token);

  },

  /*
  Clean up
   */

  [LOGOFF]({ commit }) {
    commit(m.SET_AUTHORIZED, {});
    localStorage.removeItem(LS_KEY);
    m.clearSavedAccounts();
    // commit(m.AUTHORIZED, { account: false, roles: false });
  },

  [CLEAR_ERROR]({ commit }) {
    commit(m.SET_NOT_AUTHORIZED, null);
  },


};

async function checkRoles(token) {

  return http.get(process.env.VUE_APP_PHA_ROLES_URL, {
    headers: { authorization: token },
  })
    .then(res => res.data);

}


async function login(phone) {

  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  return http.post(process.env.VUE_APP_PHA_AUTH_URL, `mobileNumber=${phone}`, config)
    .then(res => res.data.ID);

}

async function confirm(code, id) {

  const params = {
    ID: id,
    smsCode: code
  };
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [data => {
      const str = Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
      return str.join('&');
    }],
  };

  const { data } = await http.post(process.env.VUE_APP_PHA_AUTH_URL, params, config);

  return data;

}
