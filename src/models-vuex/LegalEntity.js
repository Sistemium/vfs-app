import { Model } from '@vuex-orm/core';

export default class LegalEntity extends Model {
  static entity = 'LegalEntity';

  static fields() {
    return {
      code: this.attr(null),
      cts: this.attr(null),
      id: this.attr(null),
      name: this.attr(null),
      ts: this.attr(null),
    };
  }
}
