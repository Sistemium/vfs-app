import get from 'lodash/get';
import find from 'lodash/find';
import VFSModel from '@/lib/VFSModel';
import Person from '@/models-vuex/Person';

export default class ServicePoint extends VFSModel {
  static entity = 'ServicePoint';

  static fields() {
    return {
      address: this.attr(null),
      apartment: this.attr(null),
      contactIds: this.attr(null),
      cts: this.attr(null),
      currentServiceContractId: this.attr(null),
      districtName: this.attr(null),
      doorCode: this.attr(null),
      gifts: this.attr(null),
      house: this.attr(null),
      id: this.attr(null),
      info: this.attr(null),
      isPaused: this.attr(null),
      isReady: this.attr(null),
      localityId: this.attr(null),
      locationId: this.attr(null),
      name: this.attr(null),
      phone: this.attr(null),
      servingMasterId: this.attr(null),
      siteId: this.attr(null),
      streetId: this.attr(null),
      ts: this.attr(null),
      type: this.attr(null),
      serviceItems: this.hasMany('ServiceItem', 'servicePointId'),
      serviceContract: this.belongsTo('ServiceContract', 'currentServiceContractId'),
      location: this.belongsTo('Location', 'locationId'),
    };
  }

  isServedBetween(dateB, dateE) {
    const { serviceItems } = this;
    return !find(serviceItems, serviceItem => serviceItem.needServiceBetween(dateB, dateE)
      && !serviceItem.serviceBetween(dateB, dateE));
  }

  contactPersons() {
    return Person.query().withAll().whereIdIn(this.contactIds).get();
  }

  coords() {
    const { location = Location.query().withAll().whereIdIn(this.contactIds).get() } = this;
    return location && {
      lat: location.latitude,
      lng: location.longitude,
    };
  }

  title() {
    return get(this.serviceContract, 'customer.name');
  }
}
