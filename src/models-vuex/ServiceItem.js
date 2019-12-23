import { Model } from '@vuex-orm/core';

export default class ServiceItem extends Model {
  static entity = 'ServiceItem';

  static fields() {
    return {
      additionalServiceInfo: this.attr(null),
      cts: this.attr(null),
      currentServiceContractId: this.attr(null),
      filterSystemId: this.attr(null),
      guaranteePeriod: this.attr(null),
      id: this.attr(null),
      info: this.attr(null),
      installingDate: this.attr(null),
      installingMasterId: this.attr(null),
      installingPrice: this.attr(null),
      lastServiceDate: this.attr(null),
      lastServiceType: this.attr(null),
      nextServiceDate: this.attr(null),
      pausedFrom: this.attr(null),
      plannedServiceDate: this.attr(null),
      plannedServiceType: this.attr(null),
      serviceFrequency: this.attr(null),
      serviceInfo: this.attr(null),
      servicePointId: this.attr(null),
      servicePrice: this.attr(null),
      servingMasterId: this.attr(null),
      smallServicePrice: this.attr(null),
      ts: this.attr(null),
    };
  }
}
