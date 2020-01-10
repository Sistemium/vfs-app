import { Model } from '@vuex-orm/core';

export default class ServiceContract extends Model {
  static entity = 'ServiceContract';

  static fields() {
    return {
      cts: this.attr(null),
      customerLegalEntityId: this.attr(null),
      customerPersonId: this.attr(null),
      date: this.attr(null),
      id: this.attr(null),
      num: this.attr(null),
      paymentMethod: this.attr(null),
      siteId: this.attr(null),
      ts: this.attr(null),
    };
  }

  legalType() {
    const { customerPersonId, customerLegalEntityId } = this;
    return (customerPersonId && 'Asmuo') || (customerLegalEntityId && 'Įmonė') || null;
  }

  get customer() {
    if (!this.legalType()) return null;
    return this.legalType() === 'Asmuo' ? this.customerPerson : this.customerLegalEntity;
  }
}
