import get from 'lodash/get';
import find from 'lodash/find';
import min from 'lodash/min';
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
    serviceItems({ id: servicePointId }) {
      return ServiceItem.reactiveManyByIndex('servicePointId', servicePointId);
    },
    isServedBetween(servicePoint, dateB, dateE, serviceItems) {
      return !find(serviceItems || this.serviceItems(servicePoint), serviceItem => {
        const need = ServiceItem.needServiceBetween(serviceItem, dateB, dateE);
        return need && !ServiceItem.serviceBetween(serviceItem, dateB, dateE);
      });
    },
    contactPersons({ contactIds }) {
      return Person.getByMany(contactIds);
    },
    coords({ locationId }) {
      const location = Location.reactiveGet(locationId);
      return location && {
        lat: location.latitude,
        lng: location.longitude,
      };
    },
    title({ currentServiceContractId }) {
      const contract = ServiceContract.reactiveGet(currentServiceContractId);
      return contract && get(ServiceContract.customer(contract), 'name');
    },
    customer({ currentServiceContractId }) {
      const contract = ServiceContract.getByID(currentServiceContractId);
      return ServiceContract.customer(contract);
    },
    nextServiceDate(servicePoint) {
      const items = this.serviceItems(servicePoint);
      const dates = items.map(item => ServiceItem.nextServiceDateFn(item));
      return min(dates);
    },
  },
});
