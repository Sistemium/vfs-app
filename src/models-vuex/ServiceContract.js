import VFSDataModel from '@/lib/VFSDataModel';
import Person from '@/models-vuex/Person';
import LegalEntity from '@/models-vuex/LegalEntity';

export default new VFSDataModel({
  collection: 'ServiceContract',
  schema: {
    customerLegalEntityId: String,
    customerPersonId: String,
    date: String,
    num: String,
    paymentMethod: String,
    siteId: String,
    // customerLegalEntity: this.belongsTo('LegalEntity', 'customerLegalEntityId'),
    // customerPerson: this.belongsTo('Person', 'customerPersonId'),
    // servicePoints: this.hasMany('ServicePoint', 'currentServiceContractId'),
  },
  methods: {
    customerPerson({ customerPersonId }) {
      return customerPersonId ? Person.reactiveGet(customerPersonId) : null;
    },
    customerLegalEntity({ customerLegalEntityId }) {
      return customerLegalEntityId ? LegalEntity.reactiveGet(customerLegalEntityId) : null;
    },
    legalType(serviceContract) {
      const {
        customerPersonId,
        customerLegalEntityId,
      } = serviceContract;
      return (customerPersonId && 'Asmuo')
        || (customerLegalEntityId && 'Įmonė')
        || null;
    },
    customer(serviceContract) {
      const legalType = this.legalType(serviceContract);
      if (!legalType) return null;
      return legalType === 'Asmuo'
        ? this.customerPerson(serviceContract)
        : this.customerLegalEntity(serviceContract);
    },
  },
});
