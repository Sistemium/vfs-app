import Model from '@/lib/Model';
import { Record } from 'js-data';

class ServiceContractRecord extends Record {
}

Object.defineProperties(ServiceContractRecord.prototype, {
  customer: {
    type: 'object',
    get() {
      if (!this.legalType()) return null;
      return this.legalType() === 'Asmuo' ? this.customerPerson : this.customerLegalEntity;
    },
  },
});

export default new Model({

  name: 'ServiceContract',

  recordClass: ServiceContractRecord,

  relations: {
    belongsTo: {
      Person: {
        localField: 'customerPerson',
        localKey: 'customerPersonId',
      },
      LegalEntity: {
        localField: 'customerLegalEntity',
        localKey: 'customerLegalEntityId',
      },
    },
    hasMany: {
      ServicePoint: {
        localField: 'servicePoints',
        foreignKey: 'currentServiceContractId',
      },
    },
  },

  methods: {
    legalType() {
      const { customerPersonId, customerLegalEntityId } = this;
      return (customerPersonId && 'Asmuo') || (customerLegalEntityId && 'Įmonė') || null;
    },
  },

});
