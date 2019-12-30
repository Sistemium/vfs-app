import get from 'lodash/get';
import filter from 'lodash/filter';
import maxBy from 'lodash/maxBy';
import find from 'lodash/find';
import isNumber from 'lodash/isNumber';
import { Record } from 'js-data';
import Model from '@/lib/Model';
import { addMonths } from '@/lib/dates';

export const SERVICE_TYPE_PAUSE = 'pause';
export const SERVICE_TYPE_FORWARD = 'forward';
export const SERVICE_TYPE_SERVICE = 'service';
export const SERVICE_TYPE_OTHER = 'other';

class ServiceItemRecord extends Record {
}

Object.defineProperties(ServiceItemRecord.prototype, {
  guaranteeEnd: {
    get() {
      const { installingDate } = this;
      const gp = this.guaranteePeriodFn();
      return (gp && installingDate) ? addMonths(installingDate, gp) : null;
    },
  },
});

export default new Model({

  name: 'ServiceItem',

  recordClass: ServiceItemRecord,

  validateOnSet: false,
  noValidate: true,
  keepChangeHistory: false,

  relations: {
    belongsTo: {
      ServicePoint: {
        localField: 'servicePoint',
        localKey: 'servicePointId',
      },
      FilterSystem: {
        localField: 'filterSystem',
        localKey: 'filterSystemId',
      },
      Employee: {
        localField: 'servingMaster',
        localKey: 'servingMasterId',
      },
    },
    hasMany: {
      ServiceItemService: {
        localField: 'services',
        foreignKey: 'serviceItemId',
      },
    },
  },

  methods: {

    serviceBetween(dateB, dateE) {
      const { services } = this;
      return find(services, ({ date }) => dateB <= date && date <= dateE);
    },

    needServiceBetween(dateB, dateE) {
      const nextDate = this.nextServiceDateFn();
      return nextDate <= dateE;
    },

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

    },

    serviceFrequencyFn() {
      return this.inheritedSystemProp('serviceFrequency');
    },

    guaranteePeriodFn() {
      return this.inheritedSystemProp('guaranteePeriod');
    },

    inheritedSystemProp(name) {
      const { [name]: value, filterSystem } = this;

      if (isNumber(value)) {
        return value;
      }

      return get(filterSystem, name)
        || get(filterSystem, `type.${name}`);
    },

  },

});

function dateAffectingService({ type }) {
  return /service|forward|pause/.test(type);
}
