import find from 'lodash/find';
import Model from '@/lib/Model';
import Person from '@/models/Person';

export default new Model({

  name: 'ServicePoint',

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    hasMany: {
      ServiceItem: {
        localField: 'serviceItems',
        foreignKey: 'servicePointId',
      },
    },
    belongsTo: {
      ServiceContract: {
        localField: 'serviceContract',
        localKey: 'currentServiceContractId',
      },
    },
  },

  methods: {
    isServedBetween(dateB, dateE) {
      const { serviceItems } = this;
      return !find(serviceItems, serviceItem => serviceItem.needServiceBetween(dateB, dateE)
        && !serviceItem.serviceBetween(dateB, dateE));
    },
    contactPersons() {
      return Person.getMany(this.contactIds);
    },
  },

});
