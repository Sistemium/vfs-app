import Model from '@/lib/Model';
import get from 'lodash/get';
import filter from 'lodash/filter';
import maxBy from 'lodash/maxBy';
import find from 'lodash/find';
import isNumber from 'lodash/isNumber';
import { Record } from 'js-data';
import { addMonths } from '@/lib/dates';

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
      // TODO: check if it wasServed within dates
      return nextDate <= dateE;
    },

    nextServiceDateFn() {

      const { services, installingDate } = this;
      const matchingServices = filter(services, dateAffectingService);
      const lastService = maxBy(matchingServices, 'date');
      const { nextServiceDate, date = installingDate, type } = lastService || {};

      switch (type) {
        case 'forward':
          return nextServiceDate || addMonths(date, 1);
        case 'service':
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
        || get(filterSystem, `filterSystemType.${name}`);
    },

  },

});

function dateAffectingService({ type }) {
  return /service|forward|pause/.test(type);
}
