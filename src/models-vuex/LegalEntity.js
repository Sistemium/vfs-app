import Contact from '@/models-vuex/Contact';
import VFSModel from '@/lib/VFSModel';

export default class LegalEntity extends VFSModel {
  static entity = 'LegalEntity';

  static fields() {
    return {
      code: this.attr(null),
      cts: this.attr(null),
      id: this.attr(null),
      name: this.attr(null),
      ts: this.attr(null),
      serviceContracts: this.hasMany('ServiceContract', 'customerLegalEntityId'),
    };
  }

  contacts() {
    return Contact.query()
      .withAll()
      .where('ownerXid', this.id)
      .get();
  }
}
