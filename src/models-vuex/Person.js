import { Model } from '@vuex-orm/core';

export default class Person extends Model {
  static entity = 'Person';

  static fields() {
    return {
      avatarPictureId: this.attr(null),
      code: this.attr(null),
      cts: this.attr(null),
      email: this.attr(null),
      firstName: this.attr(null),
      id: this.attr(null),
      lastName: this.attr(null),
      phone: this.attr(null),
      ts: this.attr(null),
    };
  }
}