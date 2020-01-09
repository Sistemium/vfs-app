import { isNative, getRoles } from 'sistemium-vue/services/native';
import { authorize as authorizeJSDataStore } from 'sistemium-telegram/jsdata/store';
import http from 'axios';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import VuexORM from '@vuex-orm/core';
import * as ls from '@/services/localStorage';
// import { roles } from 'sistemium-telegram/services/auth';
import * as m from './mutations';

const LS_KEY = 'authorization';

export const AUTH_INIT = 'AUTH_INIT';
export const LOGOFF = 'LOGOFF';
export const CLEAR_ERROR = '';

const { API_URL } = process.env;

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

    VuexORM.use(VuexORMAxios, {
      axios: http,
      baseURL: API_URL || '/api/vfs',
      headers: {
        'x-page-size': 1000,
        authorization: token,
      },
    });

    VuexORM.Model.apiConfig = {
      actions: {
        fetch() {
          return this.get(`/${this.model.entity}`);
        },
        fetchOnce() {
          const data = this.model.query().first();
          if (data) {
            return {};
          }
          return this.model.api().fetch();
        },
        async findByMany(ids, options = {}) {

          const { field = 'id' } = options;

          await this.model.api().fetchOnce();

          return this.model.query().withAll().where(field, ids).get();

        },
      },
    };

    try {
      const { account, roles } = await (isNative() ? getRoles() : checkRoles(token));
      ls.setLocalStorageItem(LS_KEY, token);
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
