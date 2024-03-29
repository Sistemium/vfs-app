import * as ls from '@/services/localStorage';
import { currentMonth } from '@/lib/dates';
import getters, * as g from './getters';
import actions from './actions';
import mutations from './mutations';

export default {

  namespaced: true,
  actions,
  mutations,
  getters,

  state() {
    return {
      [g.CURRENT_SERVING_MONTH]: currentMonth(),
      [g.SEARCH_TEXT]: '',
      [g.SERVICE_POINTS]: [],
      [g.SERVING_MASTERS]: [],
      [g.CURRENT_SERVICE_POINT]: null,
      [g.CURRENT_SERVING_MASTER]: null,
      [g.POINTS_SORTING]: ls.getLocalStorageValue(g.POINTS_SORTING, 'address'),
      [g.SHOW_DONE_TASKS]: ls.getLocalStorageValue(g.SHOW_DONE_TASKS, true),
      [g.BUSY]: '',
      [g.ERROR]: null,
    };
  },

};
