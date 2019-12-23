import Vue from 'vue';
import Vuex from 'vuex';

import VuexORM from '@vuex-orm/core';

import auth from '@/vuex/auth';
import serving from '@/vuex/serving';
import FilterSystemType from '@/models-vuex/FilterSystemType';
import ContactMethod from '@/models-vuex/ContactMethod';
import Employee from '@/models-vuex/Employee';
import FilterSystem from '@/models-vuex/FilterSystem';
import Contact from '@/models-vuex/Contact';
import LegalEntity from '@/models-vuex/LegalEntity';
import Location from '@/models-vuex/Location';
import Person from '@/models-vuex/Person';
import ServiceContract from '@/models-vuex/ServiceContract';
import ServiceItem from '@/models-vuex/ServiceItem';
import ServicePoint from '@/models-vuex/ServicePoint';
import ServiceItemService from '@/models-vuex/ServiceItemService';

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(FilterSystemType);
database.register(ContactMethod);
database.register(Employee);
database.register(FilterSystem);
database.register(Contact);
database.register(LegalEntity);
database.register(Location);
database.register(Person);
database.register(ServiceContract);
database.register(ServiceItem);
database.register(ServicePoint);
database.register(ServiceItemService);

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
