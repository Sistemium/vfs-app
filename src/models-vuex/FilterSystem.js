import { Model } from '@vuex-orm/core';
import FilterSystemType from './FilterSystemType';

export default class FilterSystem extends Model {
  static entity = 'FilterSystem';

  static fields() {
    return {
      brandId: this.attr(null),
      cts: this.attr(null),
      filterSystemTypeId: this.attr(null),
      guaranteePeriod: this.attr(null),
      id: this.attr(null),
      name: this.attr(null),
      serviceFrequency: this.attr(null),
      servicePrice: this.attr(null),
      smallServicePrice: this.attr(null),
      ts: this.attr(null),
      filterSystemType: this.belongsTo(FilterSystemType, 'filterSystemTypeId'),
    };
  }

  static apiConfig = {
    actions: {
      fetch() {
        return this.get('/FilterSystem');
      },
    },
  }
}