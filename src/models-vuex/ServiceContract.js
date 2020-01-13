import { Model } from '@vuex-orm/core';

// eslint-disable-next-line import/no-cycle
import Person from './Person';
// eslint-disable-next-line import/no-cycle
import LegalEntity from './LegalEntity';
// eslint-disable-next-line import/no-cycle
import ServicePoint from './ServicePoint';

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
      customerLegalEntity: this.belongsTo(Person, 'customerPersonId'),
      customerPerson: this.belongsTo(LegalEntity, 'customerLegalEntityId'),
      servicePoints: this.hasMany(ServicePoint, 'currentServiceContractId'),
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
