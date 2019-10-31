import find from 'lodash/find';
import get from 'lodash/get';
import Model from '@/lib/Model';
import Person from '@/models/Person';
import Location from '@/models/Location';

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
      Location: {
        localField: 'location',
        localKey: 'locationId',
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
    coords() {
      const { location = Location.get(this.locationId) } = this;
      return location && {
        lat: location.latitude,
        lng: location.longitude,
      };
    },
    title() {
      return get(this.serviceContract, 'customer.name');
    },
  },

});
