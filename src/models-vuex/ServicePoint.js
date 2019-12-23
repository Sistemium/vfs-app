import { Model } from '@vuex-orm/core';

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
}
