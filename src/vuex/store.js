import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/vuex/auth';
import serving from '@/vuex/serving';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    routingError: null,
  },

  getters: {
    routingError(state) {
      return state.routingError;
    },
  },

  mutations: {
    setRoutingError(state, { error, to, from }) {
      state.routingError = {
        error,
        to,
        from,
      };
    },
  },

  actions: {
    routingError({ commit }, info) {
      commit('setRoutingError', info);
    },
  },

  modules: {
    auth,
    serving,
  },

});
