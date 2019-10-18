import Model from '@/lib/Model';
import get from 'lodash/get';
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
    guaranteePeriodFn() {

      const { guaranteePeriod, filterSystem } = this;

      if (isNumber(guaranteePeriod)) {
        return guaranteePeriod;
      }

      return get(filterSystem, 'guaranteePeriod')
        || get(filterSystem, 'filterSystemType.guaranteePeriod');

    },
  },

});
