import { Model } from '@vuex-orm/core';
import Contact from '@/models-vuex/Contact';
// eslint-disable-next-line import/no-cycle
import ServiceContract from './ServiceContract';

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
      serviceContracts: this.hasMany(ServiceContract, 'customerPersonId'),
    };
  }

  contacts() {
    return Contact.query()
      .withAll()
      .where('ownerXid', this.id)
      .get();
  }

  get name() {
    const { firstName, lastName } = this;
    return `${firstName} ${lastName}`;
  }

}
