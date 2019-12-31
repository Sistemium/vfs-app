import { Model } from '@vuex-orm/core';

export default class Contact extends Model {
  static entity = 'Contact';

  static fields() {
    return {
      address: this.attr(null),
      contactMethodId: this.attr(null),
      cts: this.attr(null),
      id: this.attr(null),
      info: this.attr(null),
      ownerXid: this.attr(null),
      source: this.attr(null),
      ts: this.attr(null),
    };
  }
}