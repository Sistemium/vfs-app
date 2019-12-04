import { Model } from '@vuex-orm/core';

export default class FilterSystem extends Model {
  static entity = 'FilterSystem';

  static fields() {
    return {

    };
  }

  static apiConfig = {
    actions: {
      fetch() {
        return this.get('/FilterSystem');
      },
      fetchById(id) {
        return this.get(`/FilterSystem/${id}`);
      },
    },
  }
}
