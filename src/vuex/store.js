import Vue from 'vue';
import Vuex from 'vuex';

import VuexORM from '@vuex-orm/core';

import auth from '@/vuex/auth';
import serving from '@/vuex/serving';
import FilterSystemType from '@/models-vuex/FilterSystemType';
import ContactMethod from '@/models-vuex/ContactMethod';
import Employee from '@/models-vuex/Employee';
import FilterSystem from '@/models-vuex/FilterSystem';

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(FilterSystemType);
database.register(ContactMethod);
database.register(Employee);
database.register(FilterSystem);


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

  plugins: [VuexORM.install(database)],

});
