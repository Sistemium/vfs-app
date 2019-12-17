import { Model } from '@vuex-orm/core';

export default class ContactMethod extends Model {
  static entity = 'ContactMethod';

  static fields() {
    return {
      code: this.attr(null),
      cts: this.attr(null),
      id: this.attr(null),
      link: this.attr(null),
      mask: this.attr(null),
      name: this.attr(null),
      ts: this.attr(null),
      validationPattern: this.attr(null),
    };
  }

  static apiConfig = {
    actions: {
      fetch() {
        return this.get('/ContactMethod');
      },
    },
  }
}
