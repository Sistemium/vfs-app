import find from 'lodash/find';
import Model from '@/lib/Model';

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
  },

});
