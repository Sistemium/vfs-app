import find from 'lodash/find';
import filter from 'lodash/filter';
import maxBy from 'lodash/maxBy';
import isNumber from 'lodash/isNumber';
import get from 'lodash/get';
import VFSDataModel from '@/lib/VFSDataModel';
import { addMonths } from '@/lib/dates';
import ServiceItemService from '@/models-vuex/ServiceItemService';
import FilterSystem from '@/models-vuex/FilterSystem';

export const SERVICE_TYPE_PAUSE = 'pause';
export const SERVICE_TYPE_FORWARD = 'forward';
export const SERVICE_TYPE_SERVICE = 'service';
export const SERVICE_TYPE_OTHER = 'other';

export default new VFSDataModel({
  collection: 'ServiceItem',
  schema: {
    additionalServiceInfo: String,
    currentServiceContractId: String,
    filterSystemId: String,
    guaranteePeriod: Number,
    info: String,
    installingDate: String,
    installingMasterId: String,
    installingPrice: Number,
    lastServiceDate: Number,
    lastServiceType: String,
    nextServiceDate: Number,
    pausedFrom: String,
    plannedServiceDate: String,
    plannedServiceType: String,
    serviceFrequency: Number,
    serviceInfo: String,
    servicePointId: String,
    servicePrice: Number,
    servingMasterId: String,
    smallServicePrice: Number,
    // servicePoint: this.belongsTo('ServicePoint', 'servicePointId'),
    // filterSystem: this.belongsTo('FilterSystem', 'filterSystemId'),
    // servingMaster: this.belongsTo('Employee', 'servingMasterId'),
    // services: this.hasMany('ServiceItemService', 'serviceItemId'),
  },

  methods: {

    services({ id: serviceItemId }) {
      return serviceItemId && ServiceItemService.reactiveFilter({ serviceItemId })
        .map(service => ServiceItemService.fullData(service));
    },

    filterSystem({ filterSystemId }) {
      return FilterSystem.reactiveGet(filterSystemId);
    },

    byServingMasterId(servingMasterId) {
      return servingMasterId ? this.reactiveFilter({ servingMasterId }) : [];
    },

    serviceBetween(serviceItem, dateB, dateE) {
      return find(this.services(serviceItem), ({ date }) => dateB <= date && date <= dateE);
    },

    needServiceBetween(serviceItem, dateB, dateE) {
      const nextDate = this.nextServiceDateFn(serviceItem);
      return nextDate <= dateE;
    },

    nextServiceDateFn(serviceItem) {

      const {
        installingDate,
        pausedFrom,
      } = serviceItem;

      if (pausedFrom) {
        return null;
      }

      const matchingServices = filter(this.services(serviceItem), dateAffectingService);
      const lastService = maxBy(matchingServices, 'date');
      const {
        nextServiceDate,
        date = installingDate,
        type = 'install',
      } = lastService || {};

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
          return addMonths(date, this.serviceFrequencyFn(serviceItem));
        default:
          return null;
      }

    },

    serviceFrequencyFn(serviceItem) {
      return this.inheritedSystemProp(serviceItem, 'serviceFrequency');
    },

    guaranteePeriodFn(serviceItem) {
      return this.inheritedSystemProp(serviceItem, 'guaranteePeriod');
    },

    inheritedSystemProp(serviceItem, name) {
      const { [name]: value } = serviceItem;
      if (isNumber(value)) {
        return value;
      }
      return get(this.filterSystem(serviceItem), name)
        || get(FilterSystem.type(this.filterSystem(serviceItem)), name);
    },

    guaranteeEnd(serviceItem) {
      const { installingDate } = serviceItem;
      const gp = this.guaranteePeriodFn(serviceItem);
      return (gp && installingDate) ? addMonths(installingDate, gp) : null;
    },

  },

});

function dateAffectingService({ type }) {
  return /service|forward|pause/.test(type);
}
