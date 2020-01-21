import find from 'lodash/find';
import filter from 'lodash/filter';
import maxBy from 'lodash/maxBy';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';
import VFSModel from '@/lib/VFSModel';
import { addMonths } from '@/lib/dates';

export const SERVICE_TYPE_PAUSE = 'pause';
export const SERVICE_TYPE_FORWARD = 'forward';
export const SERVICE_TYPE_SERVICE = 'service';
export const SERVICE_TYPE_OTHER = 'other';

export default class ServiceItem extends VFSModel {
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
      servicePoint: this.belongsTo('ServicePoint', 'servicePointId'),
      filterSystem: this.belongsTo('FilterSystem', 'filterSystemId'),
      servingMaster: this.belongsTo('Employee', 'servingMasterId'),
      services: this.hasMany('ServiceItemService', 'serviceItemId'),
    };

  }

  static byServingMasterId(servingMasterId) {
    return this.query()
      .withAll()
      .where('servingMasterId', servingMasterId)
      .limit(1000)
      .get();
  }

  serviceBetween(dateB, dateE) {
    const { services } = this;
    return find(services, ({ date }) => dateB <= date && date <= dateE);
  }

  needServiceBetween(dateB, dateE) {
    const nextDate = this.nextServiceDateFn();
    return nextDate <= dateE;
  }

  nextServiceDateFn() {

    const { services, installingDate, pausedFrom } = this;

    if (pausedFrom) {
      return null;
    }

    const matchingServices = filter(services, dateAffectingService);
    const lastService = maxBy(matchingServices, 'date');
    const { nextServiceDate, date = installingDate, type = 'install' } = lastService || {};

    if (type === SERVICE_TYPE_PAUSE) {
      return null;
    }

    if (this.nextServiceDate) {
      return this.nextServiceDate;
    }

    switch (type) {
      case SERVICE_TYPE_FORWARD:
        return nextServiceDate || addMonths(date, 1);
      case SERVICE_TYPE_SERVICE:
      case 'install':
        return addMonths(date, this.serviceFrequencyFn());
      default:
        return null;
    }

  }

  serviceFrequencyFn() {
    return this.inheritedSystemProp('serviceFrequency');
  }

  guaranteePeriodFn() {
    return this.inheritedSystemProp('guaranteePeriod');
  }

  inheritedSystemProp(name) {
    const { [name]: value, filterSystem } = this;

    if (isNumber(value)) {
      return value;
    }

    return get(filterSystem, name)
      || get(filterSystem, `type.${name}`);
  }

  get guaranteeEnd() {
    const { installingDate } = this;
    const gp = this.guaranteePeriodFn();
    return (gp && installingDate) ? addMonths(installingDate, gp) : null;
  }

}

function dateAffectingService({ type }) {
  return /service|forward|pause/.test(type);
}
