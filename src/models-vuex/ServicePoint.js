import get from 'lodash/get';
import find from 'lodash/find';
import VFSDataModel from '@/lib/VFSDataModel';
import Person from '@/models-vuex/Person';
import ServiceItem from '@/models-vuex/ServiceItem';
import Location from '@/models-vuex/Location';
import ServiceContract from '@/models-vuex/ServiceContract';

export default new VFSDataModel({
  collection: 'ServicePoint',
  schema: {
    address: String,
    apartment: String,
    contactIds: [String],
    currentServiceContractId: String,
    districtName: String,
    doorCode: String,
    gifts: String,
    house: String,
    info: String,
    isPaused: Boolean,
    isReady: Boolean,
    localityId: String,
    locationId: String,
    name: String,
    phone: String,
    servingMasterId: String,
    siteId: String,
    streetId: String,
    type: String,
    // serviceItems: this.hasMany('ServiceItem', 'servicePointId'),
    // serviceContract: this.belongsTo('ServiceContract', 'currentServiceContractId'),
    // location: this.belongsTo('Location', 'locationId'),
  },

  methods: {
    isServedBetween(servicePoint, dateB, dateE) {
      const serviceItems = ServiceItem.reactiveFilter(servicePoint);
      return !find(serviceItems, serviceItem => {
        const need = ServiceItem.needServiceBetween(serviceItem, dateB, dateE);
        return need && !ServiceItem.serviceBetween(serviceItem, dateB, dateE);
      });
    },
    contactPersons({ contactIds }) {
      return Person.reactiveFilter({ contactIds });
    },
    coords({ locationId }) {
      const location = Location.reactiveGet(locationId);
      return location && {
        lat: location.latitude,
        lng: location.longitude,
      };
    },
    title({ serviceContractId }) {
      const contract = ServiceContract.reactiveGet(serviceContractId);
      return contract && get(ServiceContract.customer(contract), 'name');
    },
  },
});
