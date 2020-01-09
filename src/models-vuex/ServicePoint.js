import { Model } from '@vuex-orm/core';
import get from 'lodash/get';
import find from 'lodash/find';
import Person from '@/models/Person';
import Location from '@/models/Location';

export default class ServicePoint extends Model {
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
    };
  }

  isServedBetween(dateB, dateE) {
    const { serviceItems } = this;
    return !find(serviceItems, serviceItem => serviceItem.needServiceBetween(dateB, dateE)
      && !serviceItem.serviceBetween(dateB, dateE));
  }

  contactPersons() {
    return Person.getMany(this.contactIds);
  }

  coords() {
    const { location = Location.get(this.locationId) } = this;
    return location && {
      lat: location.latitude,
      lng: location.longitude,
    };
  }

  title() {
    return get(this.serviceContract, 'customer.name');
  }
}
