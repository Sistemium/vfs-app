import { Model } from '@vuex-orm/core';

export default class ContactMethod extends Model {
  static entity = 'ContactMethod';

  static fields() {
    return {

    };
  }

  static apiConfig = {
    actions: {
      fetch() {
        return this.get('/ContactMethod');
      },
      fetchById(id) {
        return this.get(`/ContactMethod/${id}`);
      },
    },
  }
}
