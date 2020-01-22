import VFSModel from '@/lib/VFSModel';

export default class FilterSystemType extends VFSModel {
  static entity = 'FilterSystemType';

  static fields() {
    return {
      code: this.attr(null),
      cts: this.attr(null),
      guaranteePeriod: this.attr(null),
      id: this.attr(null),
      name: this.attr(null),
      serviceFrequency: this.attr(null),
      ts: this.attr(null),
      systems: this.hasMany('FilterSystem', 'filterSystemTypeId'),
    };
  }
}
