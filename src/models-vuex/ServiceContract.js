import VFSDataModel from '@/lib/VFSDataModel';
import Person from '@/models-vuex/Person';
import LegalEntity from '@/models-vuex/LegalEntity';

const CUSTOMER_LEGAL_ENTITY = 'Įmonė';
const CUSTOMER_PERSON = 'Asmuo';

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
      return Person.reactiveGet(customerPersonId);
    },
    customerLegalEntity({ customerLegalEntityId }) {
      return LegalEntity.reactiveGet(customerLegalEntityId);
    },
    legalType(serviceContract) {
      const {
        customerPersonId,
        customerLegalEntityId,
      } = serviceContract;
      return (customerPersonId && CUSTOMER_PERSON)
        || (customerLegalEntityId && CUSTOMER_LEGAL_ENTITY)
        || null;
    },
    customer(serviceContract) {
      const legalType = this.legalType(serviceContract);
      if (!legalType) {
        return null;
      }
      if (legalType === CUSTOMER_LEGAL_ENTITY) {
        return this.customerLegalEntity(serviceContract);
      }
      const person = this.customerPerson(serviceContract);
      return person && {
        ...person,
        name: Person.name(person),
      };
    },
  },
});
