import { Model } from '@vuex-orm/core';
import Contact from '@/models-vuex/Contact';
// eslint-disable-next-line import/no-cycle
import ServiceContract from '@/models-vuex/ServiceContract';

export default class LegalEntity extends Model {
  static entity = 'LegalEntity';

  static fields() {
    return {
      code: this.attr(null),
      cts: this.attr(null),
      id: this.attr(null),
      name: this.attr(null),
      ts: this.attr(null),
      serviceContracts: this.hasMany(ServiceContract, 'customerLegalEntityId'),
    };
  }

  contacts() {
    return Contact.query()
      .withAll()
      .where('ownerXid', this.id)
      .get();
  }
}
