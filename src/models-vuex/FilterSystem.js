import { Model } from '@vuex-orm/core';

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
      type: this.belongsTo('FilterSystemType', 'filterSystemTypeId'),
    };
  }
}
