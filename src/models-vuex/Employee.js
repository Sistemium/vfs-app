import { Model } from '@vuex-orm/core';

export default class Employee extends Model {
  static entity = 'Employee';

  static fields() {
    return {

    };
  }

  static apiConfig = {
    actions: {
      fetch() {
        return this.get('/Employee');
      },
      fetchById(id) {
        return this.get(`/Employee/${id}`);
      },
    },
  }
}
