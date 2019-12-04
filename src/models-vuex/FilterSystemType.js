import { Model } from '@vuex-orm/core';

export default class FilterSystemType extends Model {
  static entity = 'FilterSystemType';

  static fields() {
    return {

    };
  }

  static apiConfig = {
    actions: {
      fetch() {
        return this.get('/FilterSystemType');
      },
      fetchById(id) {
        return this.get(`/FilterSystemType/${id}`);
      },
    },
  }
}
