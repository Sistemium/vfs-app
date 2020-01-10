import { Model } from '@vuex-orm/core';

export default class Employee extends Model {
  static entity = 'Employee';

  static fields() {
    return {
      cts: this.attr(null),
      id: this.attr(null),
      info: this.attr(null),
      name: this.attr(null),
      personId: this.attr(null),
      siteId: this.attr(null),
      ts: this.attr(null),
    };
  }

}
