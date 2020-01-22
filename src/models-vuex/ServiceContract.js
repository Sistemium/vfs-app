import VFSModel from '@/lib/VFSModel';

export default class ServiceContract extends VFSModel {
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
      customerLegalEntity: this.belongsTo('LegalEntity', 'customerLegalEntityId'),
      customerPerson: this.belongsTo('Person', 'customerPersonId'),
      servicePoints: this.hasMany('ServicePoint', 'currentServiceContractId'),
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
